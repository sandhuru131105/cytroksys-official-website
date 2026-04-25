import { motion as Motion } from 'framer-motion'
import { valueProps } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function WhyChooseSection() {
  return (
    <section className="cyber-noise theme-sheen-violet border-y border-cyber-line/60 bg-cyber-panel/45 py-20" aria-labelledby="why-title">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Why Cytroksys"
          title="Secure. Scale. Succeed."
          description="Our delivery model combines proactive security with engineering execution so your roadmap stays fast, compliant, and resilient."
          align="center"
        />

        <Motion.div
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {valueProps.map((value, index) => (
            <Motion.article
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="why-card glass-card premium-shimmer rounded-[1.75rem] border border-cyber-line bg-cyber-panel p-6"
              style={{ '--value-accent': value.accent }}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="surface-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyber-ink"
                  style={{ color: value.accent }}
                >
                  <IconResolver name={value.icon} className="h-5 w-5" />
                </div>
                <span className="why-card-index text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg text-cyber-text">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cyber-muted/95">{value.description}</p>
              <div className="mt-6 border-t border-cyber-line/20 pt-4">
                <span className="why-card-label text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Built into every engagement
                </span>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

