import { dimensions } from './dimensions'
import type { PoleCode } from './dimensions'

export type PersonalityCode = `${'C' | 'D'}${'F' | 'G'}${'R' | 'E'}${'U' | 'A'}`
export type PersonalityGroupId = `C${'R' | 'E'}` | `D${'F' | 'G'}`

export interface Personality {
  code: PersonalityCode
  icon: string
}

export const personalities: readonly Personality[] = [
  { code: 'CFRU', icon: 'i-lucide-brain' },
  { code: 'CFRA', icon: 'i-lucide-palette' },
  { code: 'CFEU', icon: 'i-lucide-wrench' },
  { code: 'CFEA', icon: 'i-lucide-lightbulb' },
  { code: 'CGRU', icon: 'i-lucide-shield-check' },
  { code: 'CGRA', icon: 'i-lucide-building-2' },
  { code: 'CGEU', icon: 'i-lucide-clipboard-check' },
  { code: 'CGEA', icon: 'i-lucide-hammer' },
  { code: 'DFRU', icon: 'i-lucide-route' },
  { code: 'DFRA', icon: 'i-lucide-clapperboard' },
  { code: 'DFEU', icon: 'i-lucide-zap' },
  { code: 'DFEA', icon: 'i-lucide-compass' },
  { code: 'DGRU', icon: 'i-lucide-house' },
  { code: 'DGRA', icon: 'i-lucide-scroll-text' },
  { code: 'DGEU', icon: 'i-lucide-settings' },
  { code: 'DGEA', icon: 'i-lucide-audio-lines' },
]

// Color only distinguishes browsing groups; it never rates a preference.
export const personalityGroups = [
  {
    id: 'CR',
    poles: ['C', 'R'],
    textClass: 'text-emerald-700 dark:text-emerald-400',
    surfaceClass: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    id: 'CE',
    poles: ['C', 'E'],
    textClass: 'text-sky-700 dark:text-sky-400',
    surfaceClass: 'bg-sky-50 dark:bg-sky-950/40',
  },
  {
    id: 'DF',
    poles: ['D', 'F'],
    textClass: 'text-amber-700 dark:text-amber-400',
    surfaceClass: 'bg-amber-50 dark:bg-amber-950/40',
  },
  {
    id: 'DG',
    poles: ['D', 'G'],
    textClass: 'text-rose-700 dark:text-rose-400',
    surfaceClass: 'bg-rose-50 dark:bg-rose-950/40',
  },
] as const satisfies ReadonlyArray<{
  id: PersonalityGroupId
  poles: readonly PoleCode[]
  textClass: string
  surfaceClass: string
}>

export function getPersonalitiesInGroup(groupId: PersonalityGroupId) {
  const group = personalityGroups.find(group => group.id === groupId)
  if (!group) return []

  return personalities.filter(personality => {
    const poles = getPersonalityPoles(personality.code).map(pole => pole.code)
    return group.poles.every(pole => poles.includes(pole))
  })
}

export function getPersonalityPoles(code: PersonalityCode) {
  return dimensions.map((dimension, index) => (
    dimension.left.code === code[index] ? dimension.left : dimension.right
  ))
}
