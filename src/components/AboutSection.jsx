import { motion as Motion } from 'framer-motion'
import { companyProfile, founder } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

export default function AboutSection() {
  return (
    <section id="about" className="theme-sheen-cyan mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:px-6" aria-labelledby="about-title">
      <div>
        <SectionHeading
          eyebrow="About Us"
          title="Small Team. Big Impact."
          description={companyProfile.intro}
        />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-cyber-muted md:text-base">
          <p>
            We partner with founders and IT leaders to build digital systems that are secure by design and optimized for growth. Every engagement is outcome-driven and engineered for long-term maintainability.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="glass-card rounded-3xl border border-cyber-line/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyber-cyan">Mission</p>
            <p className="mt-3 text-sm leading-relaxed text-cyber-muted">{companyProfile.mission}</p>
          </div>
          <div className="glass-card rounded-3xl border border-cyber-line/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyber-cyan">Vision</p>
            <p className="mt-3 text-sm leading-relaxed text-cyber-muted">{companyProfile.vision}</p>
          </div>
        </div>
      </div>

      <Motion.article
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="glass-card premium-shimmer rounded-3xl border border-cyber-line p-7"
      >
        <div className="flex items-center gap-5">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cyber-cyan/40 bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20 p-1 shadow-glow/30 overflow-hidden">
            {/* Inner Decorative Circle */}
            <div className="absolute inset-1.5 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-cyber-cyan/40 z-20 pointer-events-none" />
            {founder.photo ? (
              <img 
                src={founder.photo} 
                alt={founder.name} 
                className="h-full w-full rounded-full object-cover z-10"
              />
            ) : (
              <div className="z-10 flex h-full w-full items-center justify-center rounded-full bg-cyber-ink/40 font-display text-xl font-bold text-cyber-text backdrop-blur-sm">
                {founder.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-cyber-text">{founder.name}</h3>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyber-cyan/90">{founder.role}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cyber-muted">Founder-led Delivery</p>
          </div>
        </div>
        <p className="mt-6 text-base leading-relaxed text-cyber-muted/90">{founder.bio}</p>
        
        <div className="mt-8 pt-6 border-t border-cyber-line/50">
          <a 
            href={companyProfile.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-sm font-bold tracking-wide text-cyber-text transition hover:text-cyber-cyan"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan transition group-hover:bg-cyber-cyan group-hover:text-cyber-ink">
              <IconResolver name="ExternalLink" className="h-4 w-4" />
            </span>
            {companyProfile.website.replace('https://', '')}
          </a>
        </div>
      </Motion.article>
    </section>
  )
}

