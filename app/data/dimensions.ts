export type DimensionId = 'control' | 'constraints' | 'values' | 'cognition'
export type PoleCode = 'C' | 'D' | 'F' | 'G' | 'U' | 'A' | 'R' | 'E'

export interface DimensionPole {
  code: PoleCode
  word: string
}

export interface Dimension {
  id: DimensionId
  icon: string
  left: DimensionPole
  right: DimensionPole
}

// This order defines four-letter type codes. Keep identifiers stable and display copy in locales.
export const dimensions: readonly Dimension[] = [
  {
    id: 'control',
    icon: 'i-lucide-sliders-horizontal',
    left: { code: 'C', word: 'Control' },
    right: { code: 'D', word: 'Delegation' },
  },
  {
    id: 'constraints',
    icon: 'i-lucide-braces',
    left: { code: 'F', word: 'Flexibility' },
    right: { code: 'G', word: 'Guarantees' },
  },
  {
    id: 'cognition',
    icon: 'i-lucide-flask-conical',
    left: { code: 'R', word: 'Reasoning' },
    right: { code: 'E', word: 'Experimentation' },
  },
  {
    id: 'values',
    icon: 'i-lucide-gem',
    left: { code: 'U', word: 'Utility' },
    right: { code: 'A', word: 'Aesthetics' },
  },
]
