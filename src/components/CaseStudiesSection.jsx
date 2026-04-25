import { motion as Motion } from 'framer-motion'
import { caseStudies } from '../data/company'
import SectionHeading from './SectionHeading'

const caseAccents = ['#00F0FF', '#7B2FFF', '#FF4D9A']

export default function CaseStudiesSection() {
  return (
    <section className="cyber-noise theme-sheen-cyan mx-auto w-full max-w-7xl px-4 py-20 md:px-6" aria-labelledby="case-studies-title">
      <SectionHeading
        eyebrow="Case Studies"
        title="Proof in Production"
        description="A snapshot of how Cytroksys teams help organizations modernize faster while improving security posture and reliability."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {caseStudies.map((item, index) => (
          <Motion.article
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="case-study-card group glass-card premium-shimmer relative rounded-3xl border border-cyber-line bg-cyber-panel p-6"
            style={{ '--case-accent': caseAccents[index % caseAccents.length] }}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-25 blur-3xl transition duration-500 group-hover:opacity-60"
              style={{ background: caseAccents[index % caseAccents.length] }}
              aria-hidden="true"
            />
            <p className="font-display text-lg text-cyber-text">{item.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-cyber-muted">{item.outcome}</p>
            <p className="case-metric mt-6 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]">
              {item.metrics}
            </p>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

