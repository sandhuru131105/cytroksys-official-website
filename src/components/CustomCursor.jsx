import { useEffect, useRef, useCallback } from 'react'

/**
 * Custom cursor with a small dot core + larger trailing ring.
 * Blends with the page via mix-blend-mode for a premium look.
 * Auto-hides on touch devices and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)
  const visible = useRef(false)

  const lerp = (a, b, t) => a + (b - a) * t

  const animate = useCallback(() => {
    ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15)
    ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15)

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Skip on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouchDevice || prefersReduced) return

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      if (!visible.current) {
        visible.current = true
        if (dotRef.current) dotRef.current.style.opacity = '1'
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }
    }

    const onMouseLeave = () => {
      visible.current = false
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add('cursor-ring--click')
    }

    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('cursor-ring--click')
    }

    // Handle hover states on interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, .glass-card, .brand-cta').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          if (ringRef.current) ringRef.current.classList.add('cursor-ring--hover')
          if (dotRef.current) dotRef.current.classList.add('cursor-dot--hover')
        })
        el.addEventListener('mouseleave', () => {
          if (ringRef.current) ringRef.current.classList.remove('cursor-ring--hover')
          if (dotRef.current) dotRef.current.classList.remove('cursor-dot--hover')
        })
      })
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    
    // Add cursor: none to body
    document.body.classList.add('custom-cursor-active')

    // Observe DOM changes to re-apply hover listeners
    addHoverListeners()
    const observer = new MutationObserver(() => {
      addHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.classList.remove('custom-cursor-active')
      observer.disconnect()
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
