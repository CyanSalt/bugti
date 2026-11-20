import { dimensions } from '../data/dimensions'
import type { Dimension, PoleCode } from '../data/dimensions'
import { personalities } from '../data/personalities'
import type { PersonalityCode } from '../data/personalities'
import { isAnswer, isAnswerSet, questions } from '../data/questionnaire'
import type { Answer, LegacyAnswer } from '../data/questionnaire'

export type DimensionResult = {
  dimension: Dimension
  answered: number
} & ({
  status: 'incomplete'
} | {
  status: 'complete'
  sum: number
  mean: number
  leftIndex: number
  rightIndex: number
  leftMean: number
  rightMean: number
  pole: PoleCode | null
  nearBoundary: boolean
  pattern: 'both' | 'neither' | 'neutral' | null
})

export interface QuestionnaireResult {
  dimensions: DimensionResult[]
  status: 'typed' | 'balanced' | 'incomplete'
  type: PersonalityCode | null
  candidates: PersonalityCode[]
}

export function scoreQuestionnaire(answers: readonly Answer[]): QuestionnaireResult {
  if (!isAnswerSet(answers)) throw new Error('Invalid questionnaire answers')
  return calculateScores(answers)
}

// Historical links retain their original missing-answer semantics.
export function scoreLegacyQuestionnaire(answers: readonly LegacyAnswer[]): QuestionnaireResult {
  if (!Array.isArray(answers) || answers.length !== questions.length
    || !Array.from(answers).every(answer => isAnswer(answer) || answer === 'x')) throw new Error('Invalid legacy answers')
  return calculateScores(answers)
}

function calculateScores(answers: readonly LegacyAnswer[]): QuestionnaireResult {
  const scores: DimensionResult[] = dimensions.map((dimension) => {
    const entries = questions.flatMap((question, index) => {
      if (question.dimension !== dimension.id) return []
      const answer = answers[index]!
      return typeof answer === 'number' ? [{ key: question.key, answer }] : []
    })
    if (entries.length !== 8) return { dimension, status: 'incomplete', answered: entries.length }

    const sum = entries.reduce((total, entry) => total + entry.key * (entry.answer - 3), 0)
    const leftMean = entries.filter(entry => entry.key === 1).reduce((total, entry) => total + entry.answer, 0) / 4
    const rightMean = entries.filter(entry => entry.key === -1).reduce((total, entry) => total + entry.answer, 0) / 4
    const mean = sum / 8
    const leftIndex = 25 * (mean + 2)
    return {
      dimension, status: 'complete', answered: 8, sum, mean, leftIndex, rightIndex: 100 - leftIndex,
      leftMean, rightMean,
      pole: sum > 0 ? dimension.left.code : sum < 0 ? dimension.right.code : null,
      nearBoundary: Math.abs(mean) <= 0.5,
      pattern: leftMean > 3 && rightMean > 3 ? 'both'
        : leftMean < 3 && rightMean < 3 ? 'neither'
          : leftMean === 3 && rightMean === 3 ? 'neutral' : null,
    }
  })

  if (scores.some(score => score.status === 'incomplete')) {
    return { dimensions: scores, status: 'incomplete', type: null, candidates: [] }
  }
  const candidates = personalities.filter(personality => scores.every((score, index) =>
    score.status === 'complete' && (score.pole === null || score.pole === personality.code[index]),
  )).map(personality => personality.code)
  const type = candidates.length === 1 ? candidates[0]! : null
  return { dimensions: scores, status: type ? 'typed' : 'balanced', type, candidates }
}
