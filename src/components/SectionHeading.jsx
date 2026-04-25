import { motion as Motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={align === 'center' ? 'text-center' : 'text-left'}
    >
      {eyebrow ? (
        <Motion.p
          initial={{ opacity: 0, x: align === 'center' ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-eyebrow section-eyebrow-chip inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-[11px] uppercase tracking-[0.24em] text-cyber-cyan/80"
        >
          <span className="section-eyebrow-line" aria-hidden="true" />
          {eyebrow}
        </Motion.p>
      ) : null}
      <Motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="section-title mt-4 font-display text-3xl leading-[1.08] text-cyber-text md:text-4xl"
      >
        {title}
      </Motion.h2>
      {description ? (
        <Motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-cyber-muted md:text-base ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </Motion.p>
      ) : null}
    </Motion.header>
  )
}
