import { useEffect, useRef, useState, memo } from 'react'

/**
 * Animated counter that counts up from 0 to `end` when scrolled into view.
 * Supports suffixes like "+" and "%" 
 */
function AnimatedCounter({ end, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const numericEnd = parseInt(end, 10)
    if (isNaN(numericEnd)) {
      setCount(end)
      return
    }

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericEnd))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [started, end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default memo(AnimatedCounter)
