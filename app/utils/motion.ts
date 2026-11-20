export interface MotionTarget {
  animate: (keyframes: Keyframe[], options: KeyframeAnimationOptions) => Animation
}

// Own short-lived animations without retaining finished effects or stale work.
export function createMotionController(reducedMotion: () => boolean) {
  const active = new Set<Animation>()
  let disposed = false

  function clear() {
    for (const animation of active) animation.cancel()
    active.clear()
  }

  function animate(target: MotionTarget | null | undefined, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
    if (disposed || reducedMotion() || !target?.animate) return
    const animation = target.animate(keyframes, { ...options, fill: 'backwards' })
    active.add(animation)
    const release = () => {
      active.delete(animation)
      animation.removeEventListener('finish', release)
      animation.removeEventListener('cancel', release)
    }
    animation.addEventListener('finish', release)
    animation.addEventListener('cancel', release)
    return animation
  }

  return {
    animate,
    clear,
    [Symbol.dispose]() {
      disposed = true
      clear()
    },
  }
}
