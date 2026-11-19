import { describe, expect, it } from 'vitest'
import { dimensions } from '../app/data/dimensions'
import { getPersonalitiesInGroup, getPersonalityPoles, personalities, personalityGroups } from '../app/data/personalities'
import { messages } from '../app/locales'

describe('Personality directory', () => {
  it('covers each of the sixteen combinations exactly once in the approved order', () => {
    const expected = dimensions.reduce<string[]>((codes, dimension) => (
      codes.flatMap(code => [code + dimension.left.code, code + dimension.right.code])
    ), [''])
    expect(new Set(personalities.map(type => type.code)).size).toBe(16)
    expect(personalities.map(type => type.code)).toEqual(expected)
  })

  it('uses the sixteen approved English names', () => {
    expect(personalities.map(type => messages.en.personalities[type.code].name)).toEqual([
      'Philosopher', 'Artist', 'Engineer', 'Inventor',
      'Goalkeeper', 'Architect', 'Inspector', 'Craftsperson',
      'Planner', 'Director', 'Doer', 'Explorer',
      'Steward', 'Lawmaker', 'Administrator', 'Sound Engineer',
    ])
  })

  it('uses cognition for Control groups and constraints for Delegation groups', () => {
    expect(personalityGroups.map(group => group.id)).toEqual(['CR', 'CE', 'DF', 'DG'])
    expect(getPersonalitiesInGroup('CR').map(type => type.code)).toEqual(['CFRU', 'CFRA', 'CGRU', 'CGRA'])
    expect(getPersonalitiesInGroup('CE').map(type => type.code)).toEqual(['CFEU', 'CFEA', 'CGEU', 'CGEA'])
    expect(getPersonalitiesInGroup('DF').map(type => type.code)).toEqual(['DFRU', 'DFRA', 'DFEU', 'DFEA'])
    expect(getPersonalitiesInGroup('DG').map(type => type.code)).toEqual(['DGRU', 'DGRA', 'DGEU', 'DGEA'])
  })

  it('assigns all sixteen types to exactly one four-member group', () => {
    const groupedCodes = personalityGroups.flatMap(group => {
      const members = getPersonalitiesInGroup(group.id)
      expect(members).toHaveLength(4)
      return members.map(type => type.code)
    })
    expect(new Set(groupedCodes).size).toBe(16)
    expect([...groupedCodes].sort()).toEqual(personalities.map(type => type.code).sort())
  })

  it('uses the four approved English group names', () => {
    expect(personalityGroups.map(group => messages.en.personalityGroups[group.id].title)).toEqual([
      'Planners', 'Practitioners', 'Pioneers', 'Guardians',
    ])
  })

  it('resolves every type to the correct four preferences', () => {
    for (const type of personalities) {
      expect(getPersonalityPoles(type.code).map(pole => pole.code).join('')).toBe(type.code)
    }
  })

  it('has a name, summary, and full description for every type in both languages', () => {
    for (const dictionary of Object.values(messages)) {
      for (const type of personalities) {
        const content = dictionary.personalities[type.code]
        expect(content.name.trim()).not.toBe('')
        expect(content.summary.trim()).not.toBe('')
        expect(content.description.length).toBeGreaterThan(content.summary.length)
      }
      for (const group of personalityGroups) {
        expect(dictionary.personalityGroups[group.id].title.trim()).not.toBe('')
        expect(dictionary.personalityGroups[group.id].description.trim()).not.toBe('')
      }
    }
  })
})
