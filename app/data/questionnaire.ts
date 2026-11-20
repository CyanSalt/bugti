import type { DimensionId } from './dimensions'

export const questionnaireVersion = 'BUGTI-Q3'
export const scoringVersion = 'BUGTI-S1'
export type Answer = 1 | 2 | 3 | 4 | 5
export type LegacyAnswer = Answer | 'x'
export type DraftAnswer = Answer | null

export interface Question {
  id: string
  dimension: DimensionId
  key: 1 | -1
}

// Stable order and keys for BUGTI-Q3. Copy belongs in locales.
export const questions = [
  { id: 'Q01', dimension: 'control', key: 1 },
  { id: 'Q02', dimension: 'constraints', key: -1 },
  { id: 'Q03', dimension: 'cognition', key: 1 },
  { id: 'Q04', dimension: 'values', key: 1 },
  { id: 'Q05', dimension: 'control', key: -1 },
  { id: 'Q06', dimension: 'constraints', key: 1 },
  { id: 'Q07', dimension: 'cognition', key: -1 },
  { id: 'Q08', dimension: 'values', key: -1 },
  { id: 'Q09', dimension: 'control', key: -1 },
  { id: 'Q10', dimension: 'constraints', key: 1 },
  { id: 'Q11', dimension: 'cognition', key: -1 },
  { id: 'Q12', dimension: 'values', key: -1 },
  { id: 'Q13', dimension: 'control', key: 1 },
  { id: 'Q14', dimension: 'constraints', key: -1 },
  { id: 'Q15', dimension: 'cognition', key: 1 },
  { id: 'Q16', dimension: 'values', key: 1 },
  { id: 'Q17', dimension: 'control', key: 1 },
  { id: 'Q18', dimension: 'constraints', key: -1 },
  { id: 'Q19', dimension: 'cognition', key: 1 },
  { id: 'Q20', dimension: 'values', key: -1 },
  { id: 'Q21', dimension: 'control', key: -1 },
  { id: 'Q22', dimension: 'constraints', key: 1 },
  { id: 'Q23', dimension: 'cognition', key: -1 },
  { id: 'Q24', dimension: 'values', key: 1 },
  { id: 'Q25', dimension: 'control', key: -1 },
  { id: 'Q26', dimension: 'constraints', key: 1 },
  { id: 'Q27', dimension: 'cognition', key: -1 },
  { id: 'Q28', dimension: 'values', key: 1 },
  { id: 'Q29', dimension: 'control', key: 1 },
  { id: 'Q30', dimension: 'constraints', key: -1 },
  { id: 'Q31', dimension: 'cognition', key: 1 },
  { id: 'Q32', dimension: 'values', key: -1 },
] as const satisfies readonly Question[]

export function isAnswer(value: unknown): value is Answer {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 5
}

export interface QuestionnaireDraft {
  version: string
  answers: DraftAnswer[]
  step: number
  started: boolean
}

export function isQuestionnaireDraft(value: unknown): value is QuestionnaireDraft {
  if (!value || typeof value !== 'object') return false
  const draft = value as Partial<QuestionnaireDraft>
  return draft.version === questionnaireVersion && Array.isArray(draft.answers)
    && draft.answers.length === questions.length && Array.from(draft.answers).every(answer => answer === null || isAnswer(answer))
    && typeof draft.step === 'number' && Number.isInteger(draft.step) && draft.step >= 0 && draft.step <= questions.length
    && typeof draft.started === 'boolean'
}

export function isAnswerSet(value: unknown): value is Answer[] {
  return Array.isArray(value) && value.length === questions.length
    && Array.from(value).every(isAnswer)
}
