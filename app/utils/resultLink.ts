import { isAnswerSet, questionnaireVersion } from '../data/questionnaire'
import type { Answer, LegacyAnswer } from '../data/questionnaire'
import { isAppLocale } from '../locales'
import type { AppLocale } from '../locales'

// 0x10/11: BUGTI-Q2.1; 0x20/21: BUGTI-Q3. Both use BUGTI-S1.
const currentHeader = 0x20
const legacyHeader = 0x10
const packedLength = 14

function crc8(bytes: Uint8Array) {
  let crc = 0
  for (const byte of bytes) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit++) crc = ((crc << 1) ^ (crc & 0x80 ? 0x07 : 0)) & 0xff
  }
  return crc
}

function toBase64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function encodeResult(answers: readonly Answer[], locale: AppLocale = 'zh-CN'): string {
  if (!isAnswerSet(answers)) throw new Error('Invalid questionnaire answers')
  if (!isAppLocale(locale)) throw new Error('Invalid result locale')
  const bytes = new Uint8Array(packedLength)
  bytes[0] = currentHeader | (locale === 'en' ? 1 : 0)
  answers.forEach((answer, index) => {
    const value = answer - 1
    const bit = index * 3
    const offset = 1 + Math.floor(bit / 8)
    const shift = bit % 8
    bytes[offset] = bytes[offset]! | ((value << shift) & 0xff)
    if (shift > 5) bytes[offset + 1] = bytes[offset + 1]! | (value >> (8 - shift))
  })
  bytes[13] = crc8(bytes.subarray(0, 13))
  return toBase64Url(bytes)
}

type DecodedPayload =
  | { version: typeof questionnaireVersion, answers: Answer[], locale: AppLocale }
  | { version: 'BUGTI-Q2.1', answers: LegacyAnswer[], locale: AppLocale }

function decodePayload(value: unknown): DecodedPayload | null {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{19}$/.test(value)) return null
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/') + '=')
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0))
  const schema = bytes[0]! & 0xfe
  if (bytes.length !== packedLength || toBase64Url(bytes) !== value
    || (schema !== currentHeader && schema !== legacyHeader)
    || crc8(bytes.subarray(0, 13)) !== bytes[13]) return null
  const answers: LegacyAnswer[] = []
  for (let index = 0; index < 32; index++) {
    const bit = index * 3
    const offset = 1 + Math.floor(bit / 8)
    const shift = bit % 8
    const code = ((bytes[offset]! | ((bytes[offset + 1] ?? 0) << 8)) >> shift) & 7
    if (code > (schema === legacyHeader ? 5 : 4)) return null
    answers.push(code === 5 ? 'x' : (code + 1) as Answer)
  }
  const locale: AppLocale = bytes[0]! & 1 ? 'en' : 'zh-CN'
  if (schema === legacyHeader) return { version: 'BUGTI-Q2.1', answers, locale }
  return isAnswerSet(answers) ? { version: questionnaireVersion, answers, locale } : null
}

export function decodeResult(value: unknown): Answer[] | null {
  const payload = decodePayload(value)
  return payload?.version === questionnaireVersion ? payload.answers : null
}

export function createResultPath(answers: readonly Answer[], locale: AppLocale): string {
  return `/result?r=${encodeResult(answers, locale)}`
}

export type ResultLink =
  | { status: 'empty' }
  | { status: 'invalid' }
  | ({ status: 'valid' } & DecodedPayload)

export function readResultQuery(query: Record<string, unknown>): ResultLink {
  if (Object.keys(query).length === 0) return { status: 'empty' }
  if (Object.keys(query).some(key => key !== 'r')) return { status: 'invalid' }
  const payload = decodePayload(query.r)
  return payload ? { status: 'valid', ...payload } : { status: 'invalid' }
}
