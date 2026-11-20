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
    color: 'planner',
    textClass: 'text-planner',
    mutedClass: 'text-blue-800 dark:text-blue-200',
    surfaceClass: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    id: 'CE',
    poles: ['C', 'E'],
    color: 'practitioner',
    textClass: 'text-practitioner',
    mutedClass: 'text-cyan-800 dark:text-cyan-200',
    surfaceClass: 'bg-cyan-50 dark:bg-cyan-950',
  },
  {
    id: 'DF',
    poles: ['D', 'F'],
    color: 'pioneer',
    textClass: 'text-pioneer',
    mutedClass: 'text-orange-800 dark:text-orange-200',
    surfaceClass: 'bg-orange-50 dark:bg-orange-950',
  },
  {
    id: 'DG',
    poles: ['D', 'G'],
    color: 'guardian',
    textClass: 'text-guardian',
    mutedClass: 'text-teal-800 dark:text-teal-200',
    surfaceClass: 'bg-teal-50 dark:bg-teal-950',
  },
] as const satisfies ReadonlyArray<{
  id: PersonalityGroupId
  poles: readonly PoleCode[]
  color: 'planner' | 'practitioner' | 'pioneer' | 'guardian'
  textClass: string
  mutedClass: string
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
