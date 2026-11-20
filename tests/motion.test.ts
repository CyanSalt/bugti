import { describe, expect, it, vi } from 'vitest'
import { createMotionController } from '../app/utils/motion'

function target() {
  const effects: Array<EventTarget & { cancel: ReturnType<typeof vi.fn> }> = []
  return {
    effects,
    animate: vi.fn(() => {
      const animation = Object.assign(new EventTarget(), { cancel: vi.fn() })
      effects.push(animation)
      return animation as unknown as Animation
    }),
  }
}

describe('Interaction motion lifecycle', () => {
  it('keeps reduced-motion and unsupported targets usable without effects', () => {
    const element = target()
    using motion = createMotionController(() => true)
    motion.animate(element, [], { duration: 200 })
    motion.animate(null, [], { duration: 200 })
    expect(element.animate).not.toHaveBeenCalled()
  })

  it('cancels only unfinished effects when another interaction replaces them', () => {
    const element = target()
    using motion = createMotionController(() => false)
    motion.animate(element, [], { duration: 200 })
    motion.animate(element, [], { duration: 200 })
    element.effects[0]!.dispatchEvent(new Event('finish'))
    motion.clear()
    expect(element.effects[0]!.cancel).not.toHaveBeenCalled()
    expect(element.effects[1]!.cancel).toHaveBeenCalledOnce()
    expect(element.animate).toHaveBeenCalledWith([], { duration: 200, fill: 'backwards' })
  })

  it('releases canceled effects and forbids new work after disposal', () => {
    const element = target()
    const motion = createMotionController(() => false)
    motion.animate(element, [], { duration: 200 })
    element.effects[0]!.dispatchEvent(new Event('cancel'))
    motion.animate(element, [], { duration: 200 })
    motion[Symbol.dispose]()
    motion.animate(element, [], { duration: 200 })
    expect(element.effects[0]!.cancel).not.toHaveBeenCalled()
    expect(element.effects[1]!.cancel).toHaveBeenCalledOnce()
    expect(element.animate).toHaveBeenCalledTimes(2)
  })
})
