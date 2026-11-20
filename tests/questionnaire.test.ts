import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { dimensions } from '../app/data/dimensions'
import { isAnswerSet, isQuestionnaireDraft, questions, questionnaireVersion } from '../app/data/questionnaire'
import type { Answer, LegacyAnswer } from '../app/data/questionnaire'
import { messages } from '../app/locales'
import { personalities } from '../app/data/personalities'
import { scoreLegacyQuestionnaire, scoreQuestionnaire } from '../app/utils/scoring'
import { createResultPath, decodeResult, encodeResult, readResultQuery } from '../app/utils/resultLink'

function answersFor(code: string): Answer[] {
  return questions.map((question) => {
    const dimensionIndex = dimensions.findIndex(dimension => dimension.id === question.dimension)
    const favorLeft = code[dimensionIndex] === dimensions[dimensionIndex]!.left.code
    return (favorLeft === (question.key === 1) ? 5 : 1)
  })
}

describe('Questionnaire content', () => {
  it('matches the approved document in both languages including the stronger Q08 cost', () => {
    const source = readFileSync('docs/0003-questionnaire-and-scoring.md', 'utf8')
    expect(source).toContain(questionnaireVersion)
    for (const question of questions) {
      const block = source.split(`### ${question.id} — `)[1]!.split('### ')[0]!
      for (const [locale, label] of [['en', 'English'], ['zh-CN', 'Simplified Chinese']] as const) {
        const text = block.match(new RegExp(`\\*\\*${label}:\\*\\* (.+)`))![1]!
        expect(messages[locale].questions[question.id]).toBe(text)
      }
      expect(block).toContain(`Dimension: ${question.dimension}`)
      expect(block).toContain(`k_{${question.id.slice(1)}}=${question.key}`)
    }
  })

  it('covers each dimension with eight balanced items and stable unique IDs', () => {
    expect(questions).toHaveLength(32)
    expect(new Set(questions.map(question => question.id)).size).toBe(32)
    for (const dimension of dimensions) {
      const subset = questions.filter(question => question.dimension === dimension.id)
      expect(subset).toHaveLength(8)
      expect(subset.filter(question => question.key === 1)).toHaveLength(4)
      expect(subset.filter(question => question.key === -1)).toHaveLength(4)
    }
  })

  it.each([[], Array(32), Array(32).fill(0), Array(32).fill('3'), Array(32).fill('x'), Array(32).fill(null), Array(32).fill(6), Array(32).fill(2.5), Array(33).fill(3)])('rejects invalid answer sets', (answers) => {
    expect(isAnswerSet(answers)).toBe(false)
    expect(() => scoreQuestionnaire(answers as Answer[])).toThrow()
  })
})

describe('Questionnaire scoring', () => {
  it.each(personalities.map(personality => personality.code))('reconstructs %s in canonical order', (code) => {
    const result = scoreQuestionnaire(answersFor(code))
    expect(result.type).toBe(code)
    expect(result.candidates).toEqual([code])
    expect(result.status).toBe('typed')
    for (const score of result.dimensions) {
      expect(score.status).toBe('complete')
      if (score.status !== 'complete') continue
      expect(Math.abs(score.sum)).toBe(16)
      expect([0, 100]).toContain(score.leftIndex)
      expect(score.leftIndex + score.rightIndex).toBe(100)
    }
  })

  it.each([1, 2, 3, 4, 5] as const)('preserves balance and different endorsement patterns for uniform %s answers', (answer) => {
    const result = scoreQuestionnaire(Array(32).fill(answer))
    expect(result.type).toBeNull()
    expect(result.candidates).toHaveLength(16)
    for (const score of result.dimensions) {
      if (score.status !== 'complete') throw new Error('Expected a complete dimension')
      expect(score.sum).toBe(0)
      expect(score.leftMean).toBe(answer)
      expect(score.rightMean).toBe(answer)
      expect(score.leftIndex).toBe(50)
    }
  })

  it('keeps a missing dimension distinct from a balanced dimension', () => {
    const answers: LegacyAnswer[] = answersFor('CGRA')
    answers[0] = 'x'
    const result = scoreLegacyQuestionnaire(answers)
    expect(result.status).toBe('incomplete')
    expect(result.type).toBeNull()
    expect(result.candidates).toEqual([])
    expect(result.dimensions[0]).toMatchObject({ status: 'incomplete', answered: 7 })
    expect(result.dimensions[1]).toMatchObject({ status: 'complete', pole: 'G' })
  })

  it('retains both candidate codes at an exact single-dimension tie', () => {
    const answers = answersFor('CFEU')
    questions.forEach((question, index) => { if (question.dimension === 'control') answers[index] = 3 })
    const result = scoreQuestionnaire(answers)
    expect(result.type).toBeNull()
    expect(result.candidates).toEqual(['CFEU', 'DFEU'])
  })

  it('does not round away a small nonzero direction and flags the arithmetic boundary', () => {
    const answers: Answer[] = Array(32).fill(3)
    answers[0] = 4
    const result = scoreQuestionnaire(answers)
    expect(result.dimensions[0]).toMatchObject({ sum: 1, mean: 0.125, leftIndex: 53.125, pole: 'C', nearBoundary: true })
    expect(result.dimensions[1]).toMatchObject({ sum: 0, pole: null })
  })

  it('matches the documented control example without affecting other dimensions', () => {
    const answers: Answer[] = Array(32).fill(3)
    const example = [4, 2, 3, 4, 3, 2, 3, 4] as const
    let cursor = 0
    questions.forEach((question, index) => { if (question.dimension === 'control') answers[index] = example[cursor++]! })
    expect(scoreQuestionnaire(answers).dimensions[0]).toMatchObject({ sum: 5, mean: 0.625, leftIndex: 65.625, leftMean: 3.75, rightMean: 2.5, nearBoundary: false })
  })
})

describe('Current answer rules and historical results', () => {
  it('exposes exactly five agreement categories in both languages', () => {
    for (const locale of ['en', 'zh-CN'] as const) {
      expect(Object.keys(messages[locale].test.answers)).toEqual(['1', '2', '3', '4', '5'])
      expect(messages[locale].test).not.toHaveProperty('cannotJudge')
      expect(Object.keys(messages[locale].legacyQuestions)).toEqual(questions.map(question => question.id))
    }
  })

  it('accepts current incomplete drafts but rejects former versions and unknown answers', () => {
    const draft = { version: questionnaireVersion, answers: Array(32).fill(null), step: 0, started: false }
    expect(isQuestionnaireDraft(draft)).toBe(true)
    expect(isQuestionnaireDraft({ ...draft, answers: Array(32).fill(3), step: 32, started: true })).toBe(true)
    expect(isQuestionnaireDraft({ ...draft, version: 'BUGTI-Q2.1' })).toBe(false)
    expect(isQuestionnaireDraft({ ...draft, answers: ['x', ...Array(31).fill(3)] })).toBe(false)
    expect(isQuestionnaireDraft({ ...draft, answers: Array(32) })).toBe(false)
    expect(isQuestionnaireDraft({ ...draft, step: 33 })).toBe(false)
  })

  it('counts a midpoint as an effective answer with zero contribution', () => {
    const answers = answersFor('CGRA')
    answers[0] = 3
    const result = scoreQuestionnaire(answers)
    expect(result.dimensions[0]).toMatchObject({ status: 'complete', answered: 8, sum: 14, mean: 1.75, leftIndex: 93.75 })
  })

  it.each([
    ['ECQBgABIEiQJAABAkmg', 'zh-CN', 'CGRA'],
    ['EQBIEiQBgABAkiQJABQ', 'en', 'DFEU'],
  ])('restores historical token %s without reinterpreting it as the current version', (token, locale, type) => {
    const restored = readResultQuery({ r: token })
    if (restored.status !== 'valid' || restored.version !== 'BUGTI-Q2.1') throw new Error('Expected a historical result')
    expect(restored.locale).toBe(locale)
    expect(scoreLegacyQuestionnaire(restored.answers).type).toBe(type)
    expect(decodeResult(token)).toBeNull()
  })

  it('preserves an earlier unknown response without midpoint substitution', () => {
    const restored = readResultQuery({ r: 'ECUBgABIEiQJAABAkjU' })
    if (restored.status !== 'valid' || restored.version !== 'BUGTI-Q2.1') throw new Error('Expected a historical result')
    expect(restored.answers[0]).toBe('x')
    expect(scoreLegacyQuestionnaire(restored.answers).dimensions[0]).toMatchObject({ status: 'incomplete', answered: 7 })
    expect(() => encodeResult(restored.answers as Answer[])).toThrow()
    expect(() => scoreQuestionnaire(restored.answers as Answer[])).toThrow()
  })

  it('rejects malformed earlier answers rather than granting a legacy exemption', () => {
    expect(() => scoreLegacyQuestionnaire(Array(32))).toThrow()
    expect(() => scoreLegacyQuestionnaire(Array(32).fill(null))).toThrow()
    expect(() => scoreLegacyQuestionnaire(Array(32).fill(6))).toThrow()
  })
})

describe('Restorable result links', () => {
  function queryFor(path: string) {
    return Object.fromEntries(new URL(path, 'https://example.test').searchParams)
  }

  it('packs 32 responses, version, locale and checksum into 19 URL-safe characters', () => {
    const answers = answersFor('DFEA')
    answers[7] = 3
    const encoded = encodeResult(answers, 'en')
    expect(encoded).toMatch(/^[A-Za-z0-9_-]{19}$/)
    expect(decodeResult(encoded)).toEqual(answers)
    const path = createResultPath(answers, 'en')
    expect(path).toHaveLength(29)
    expect(path).not.toContain('#')
    expect(readResultQuery(queryFor(path))).toEqual({ status: 'valid', answers, locale: 'en', version: questionnaireVersion })
  })

  it('rejects altered, truncated, unsupported, duplicated and noncanonical payloads', () => {
    const encoded = encodeResult(answersFor('CGRA'))
    const binary = Uint8Array.from(atob(encoded.replace(/-/g, '+').replace(/_/g, '/') + '='), character => character.charCodeAt(0))
    binary[1] = binary[1]! ^ 1
    const altered = btoa(String.fromCharCode(...binary)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    expect(decodeResult(altered)).toBeNull()
    expect(decodeResult(encoded.slice(0, -1))).toBeNull()
    expect(decodeResult(`_${encoded.slice(1)}`)).toBeNull()
    expect(decodeResult(`${encoded}=`)).toBeNull()
    expect(decodeResult([encoded])).toBeNull()
    for (const query of [{ r: [encoded, encoded] }, { r: 'hello' }, { r: encoded, extra: '1' }, { r: null }]) {
      expect(readResultQuery(query).status).toBe('invalid')
    }
    expect(readResultQuery({}).status).toBe('empty')
  })

  it('round-trips every response category across byte boundaries', () => {
    for (const answer of [1, 2, 3, 4, 5] as const) {
      const answers: Answer[] = Array(32).fill(answer)
      expect(decodeResult(encodeResult(answers))).toEqual(answers)
    }
    const mixed: Answer[] = Array.from({ length: 32 }, (_, index) => ([1, 2, 3, 4, 5] as const)[index % 5]!)
    expect(decodeResult(encodeResult(mixed))).toEqual(mixed)
  })

  it.each([5, 6, 7])('rejects three-bit answer code %s even with a valid checksum', (code) => {
    const encoded = encodeResult(answersFor('CGRA'))
    const bytes = Uint8Array.from(atob(encoded.replace(/-/g, '+').replace(/_/g, '/') + '='), character => character.charCodeAt(0))
    bytes[1] = (bytes[1]! & ~7) | code
    let crc = 0
    for (const byte of bytes.subarray(0, 13)) {
      crc ^= byte
      for (let bit = 0; bit < 8; bit++) crc = ((crc << 1) ^ (crc & 0x80 ? 0x07 : 0)) & 0xff
    }
    bytes[13] = crc
    const invalid = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    expect(decodeResult(invalid)).toBeNull()
  })

  it('restores every approved type and embedded locale without cookies or a draft', () => {
    for (const personality of personalities) {
      for (const locale of ['en', 'zh-CN'] as const) {
        const path = createResultPath(answersFor(personality.code), locale)
        const restored = readResultQuery(queryFor(path))
        if (restored.status !== 'valid' || restored.version !== questionnaireVersion) throw new Error('Expected a current valid link')
        expect(scoreQuestionnaire(restored.answers).type).toBe(personality.code)
        expect(restored.locale).toBe(locale)
        expect(path.length).toBe(29)
      }
    }
  })
})
