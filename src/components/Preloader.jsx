import { motion as Motion } from 'framer-motion'

export default function Preloader({ logoSrc = '/logo.png' }) {
  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cyber-ink"
      aria-label="Loading website"
      role="status"
    >
      <div className="relative z-10 space-y-8 text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <Motion.div
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full items-center justify-center rounded-[1.7rem] border border-cyber-cyan/35 bg-gradient-to-br from-cyber-cyan/15 to-cyber-violet/15 p-2.5 shadow-[0_0_40px_rgba(0,240,255,0.18)] backdrop-blur-md"
          >
            <img
              src={logoSrc}
              alt="Cytroksys logo"
              width="80"
              height="80"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full rounded-[1.2rem] object-contain"
            />
          </Motion.div>
          <Motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-3 rounded-full border border-dashed border-cyber-cyan/20"
          />
        </div>
        
        <div className="space-y-3">
          <Motion.p 
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-cyber-cyan"
          >
            System Handshake
          </Motion.p>
          <div className="mx-auto h-[2px] w-48 overflow-hidden rounded-full bg-cyber-line/30">
            <Motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-cyan"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </div>
      </div>
    </Motion.div>
  )
}

