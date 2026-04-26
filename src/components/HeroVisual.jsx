import { motion as Motion, useReducedMotion } from 'framer-motion'
import { FaAndroid, FaApple, FaAws, FaLinux, FaWindows } from 'react-icons/fa6'
import {
  SiCloudflare,
  SiDocker,
  SiGooglecloud,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import { TbBrandAzure } from 'react-icons/tb'

const orbitItems = [
  { label: 'React', icon: SiReact, color: '#61DAFB', angle: -90 },
  { label: 'Node.js', icon: SiNodedotjs, color: '#339933', angle: -60 },
  { label: 'TypeScript', icon: SiTypescript, color: '#3178C6', angle: -30 },
  { label: 'Docker', icon: SiDocker, color: '#2496ED', angle: 0 },
  { label: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4', angle: 30 },
  { label: 'Cloudflare Zero Trust', icon: SiCloudflare, color: '#F38020', angle: 60 },
  { label: 'Azure', icon: TbBrandAzure, color: '#0078D4', angle: 90 },
  { label: 'AWS', icon: FaAws, color: '#FF9900', angle: 120 },
  { label: 'Android', icon: FaAndroid, color: '#3DDC84', angle: 150 },
  { label: 'iOS', icon: FaApple, color: '#111827', angle: 180 },
  { label: 'Windows', icon: FaWindows, color: '#2563EB', angle: 210 },
  { label: 'Linux', icon: FaLinux, color: '#F59E0B', angle: 240 },
]

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion()
  const orbitRadius = 190

  return (
    <div className="hero-visual-container relative flex h-[420px] w-full items-center justify-center overflow-hidden sm:h-[500px] lg:h-[560px]">
      <Motion.div
        className="absolute h-72 w-72 rounded-full bg-cyber-cyan/15 blur-[80px]"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={prefersReducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Motion.div
        className="absolute h-80 w-80 rounded-full bg-cyber-aurora/12 blur-[100px]"
        animate={prefersReducedMotion ? undefined : { scale: [1.06, 0.98, 1.06], opacity: [0.24, 0.4, 0.24] }}
        transition={prefersReducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-orbit-ring absolute h-[390px] w-[390px] rounded-full border border-cyber-line/70" />
        <div className="hero-orbit-ring-outer absolute h-[500px] w-[500px] rounded-full border border-cyber-line/45" />
      </div>

      <Motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { duration: 54, repeat: Infinity, ease: 'linear' }}
      >
        {orbitItems.map((item, index) => {
          const angle = (item.angle * Math.PI) / 180
          const x = Math.cos(angle) * orbitRadius
          const y = Math.sin(angle) * orbitRadius
          const Icon = item.icon

          return (
            <Motion.div
              key={item.label}
              className="absolute left-1/2 top-1/2"
              initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              transition={{ duration: 0.55, delay: 0.12 + index * 0.05, ease: 'easeOut' }}
              style={{ marginLeft: -30, marginTop: -30 }}
            >
              <div
                className="hero-tech-logo flex items-center justify-center"
                style={{ '--logo-color': item.color }}
                title={item.label}
                aria-label={item.label}
              >
                <Icon className="hero-tech-logo-icon" aria-hidden="true" />
              </div>
            </Motion.div>
          )
        })}
      </Motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-logo-aura absolute h-80 w-80 rounded-full md:h-[23rem] md:w-[23rem]" />
        <div className="hero-logo-aura hero-logo-aura-secondary absolute h-96 w-96 rounded-full md:h-[27rem] md:w-[27rem]" />
        <div className="hero-logo-core relative z-20 flex h-60 w-60 items-center justify-center rounded-full border border-cyber-cyan/25 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] md:h-[18.75rem] md:w-[18.75rem] md:p-7">
          <img
            src="/logo-hero.png"
            srcSet="/logo-hero.png 1x, /logo.png 2x"
            sizes="(min-width: 1024px) 300px, 240px"
            alt="Cytroksys"
            width="360"
            height="310"
            decoding="async"
            fetchPriority="high"
            className="hero-logo-image h-full w-full rounded-full object-contain"
            style={{ animation: prefersReducedMotion ? 'none' : undefined }}
          />
        </div>
      </div>
    </div>
  )
}
