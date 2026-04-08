import { motion as Motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { IconResolver } from './IconResolver'

const serviceNodes = [
  { icon: 'CloudCog', label: 'Cloud Ops', x: -216, y: -118, z: 40, color: '#00F0FF' },
  { icon: 'Bot', label: 'AI Agents', x: 220, y: -104, z: 60, color: '#8b5cf6' },
  { icon: 'ShieldCheck', label: 'Security', x: 220, y: 116, z: 30, color: '#10b981' },
  { icon: 'Code2', label: 'Engineering', x: -214, y: 122, z: 50, color: '#00F0FF' },
]

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion()
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouseX.set(e.clientX / innerWidth - 0.5)
      mouseY.set(e.clientY / innerHeight - 0.5)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="relative flex h-[460px] w-full items-center justify-center lg:h-[560px] [perspective:1200px]">
      <Motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex h-full w-full items-center justify-center"
      >
        {/* Background Moving Glows */}
        <Motion.div
          animate={prefersReducedMotion ? {} : { x: [-20, 20, -20], y: [10, -10, 10], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute h-80 w-80 rounded-full bg-cyber-cyan/30 blur-[100px] [transform:translateZ(-100px)]"
        />
        <Motion.div
          animate={prefersReducedMotion ? {} : { x: [20, -20, 20], y: [-10, 10, -10], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute h-96 w-96 rounded-full bg-cyber-violet/30 blur-[120px] [transform:translateZ(-150px)]"
        />

        <Motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.34, scale: 1 }
              : { opacity: [0.26, 0.48, 0.26], scale: [0.96, 1.08, 0.96] }
          }
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          className="hero-logo-aura absolute z-10 h-72 w-72 rounded-full md:h-[22rem] md:w-[22rem]"
        />
        <Motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.22, scale: 1 }
              : { opacity: [0.18, 0.34, 0.18], scale: [1.04, 1.14, 1.04] }
          }
          transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="hero-logo-aura hero-logo-aura-secondary absolute z-10 h-80 w-80 rounded-full md:h-[25rem] md:w-[25rem]"
        />

        {/* Central Company Logo with 3D shadow */}
        <Motion.div
          initial={{ scale: 0, opacity: 0, translateZ: 0 }}
          animate={{ scale: 1, opacity: 1, translateZ: 50 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="hero-logo-core absolute z-20 flex h-64 w-64 items-center justify-center rounded-full border border-cyber-cyan/30 p-6 backdrop-blur-md md:h-80 md:w-80"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img 
            src="/logo.png" 
            alt="Cytroksys" 
            className="hero-logo-image h-full w-full rounded-full object-contain"
            style={{ 
              animation: prefersReducedMotion ? 'none' : undefined,
              transform: 'translateZ(30px)'
            }}
          />
        </Motion.div>

        {/* Floating Nodes with specific Z-depth */}
        <div className="absolute z-30" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', transformStyle: 'preserve-3d' }}>
          {serviceNodes.map((node, index) => (
            <Motion.div
              key={node.label}
              initial={{ opacity: 0, x: node.x * 0.5, y: node.y * 0.5, translateZ: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, x: node.x, y: node.y, translateZ: node.z }
                  : {
                      opacity: 1,
                      x: [node.x, node.x + 8, node.x - 4, node.x],
                      y: [node.y, node.y - 10, node.y + 6, node.y],
                      translateZ: node.z
                    }
              }
              transition={{
                duration: 5 + index,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'easeInOut',
                delay: 0.3 + index * 0.15,
              }}
              className="absolute"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="glass-card flex items-center gap-3 rounded-2xl px-4 py-2.5 shadow-2xl">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-cyber-ink/80 shadow-inner" style={{ color: node.color }}>
                  <IconResolver name={node.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-[12px] font-bold uppercase tracking-wider text-cyber-text">{node.label}</span>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Orbital SVG with 3D Tilt */}
        <svg className="absolute h-[600px] w-[600px] opacity-20 [transform:translateZ(-50px)rotateX(10deg)]" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="orbit-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-cyan)" />
              <stop offset="100%" stopColor="var(--color-violet)" />
            </linearGradient>
          </defs>
          <Motion.circle
            cx="200"
            cy="200"
            r="180"
            stroke="url(#orbit-grad-3d)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="8 12"
          />
        </svg>

        {/* Cyber Grid with depth */}
        <div className="absolute inset-0 -z-10 [transform:translateZ(-200px)scale(1.5)] opacity-20">
          <div className="cyber-grid-overlay h-full w-full" />
        </div>
      </Motion.div>
    </div>
  )
}
