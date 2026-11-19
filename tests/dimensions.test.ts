import { describe, expect, it } from 'vitest'
import { dimensions } from '../app/data/dimensions'
import { messages } from '../app/locales'

describe('BUGTI dimensions', () => {
  it('preserves the approved preference pairs and their order', () => {
    expect(dimensions.map(({ left, right }) => `${left.code}/${right.code}`)).toEqual([
      'C/D', 'F/G', 'R/E', 'U/A',
    ])
  })

  it('uses eight unique preference codes', () => {
    const codes = dimensions.flatMap(({ left, right }) => [left.code, right.code])
    expect(new Set(codes).size).toBe(8)
  })

  it('provides complete translations with stable dimension identifiers and pole names', () => {
    expect(new Set(dimensions.map(dimension => dimension.id)).size).toBe(4)
    for (const dictionary of Object.values(messages)) {
      for (const dimension of dimensions) {
        expect(dictionary.dimensions[dimension.id].title.trim()).not.toBe('')
        expect(dictionary.dimensions[dimension.id].question.trim()).not.toBe('')
        for (const pole of [dimension.left, dimension.right]) {
          expect(pole.word.startsWith(pole.code)).toBe(true)
          expect(dictionary.poles[pole.code].label.trim()).not.toBe('')
          expect(dictionary.poles[pole.code].description.trim()).not.toBe('')
        }
      }
    }
  })
})
