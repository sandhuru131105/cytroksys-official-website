import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const serviceTagMap = {
  'web-app': 'Product',
  'ai-agent': 'Automation',
  firewall: 'Security',
  'cloud-mgmt': 'Operate',
  migration: 'Migration',
  hybrid: 'Hybrid',
  'security-audit': 'Audit',
}

const deliveryPrinciples = [
  'Founder-led planning',
  'Security-first execution',
  'Fast handoff and support',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
}

export default function ServicesSection() {
  return (
    <section id="services" className="cyber-noise theme-sheen-cyan mx-auto w-full max-w-7xl px-4 py-24 md:px-6 md:py-32" aria-labelledby="services-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="service-side-panel sticky top-28 rounded-[2rem] border border-cyber-line/70 p-6 md:p-8">
            <SectionHeading
              eyebrow="Our Expertise"
              title="Delivery Systems for Products, Cloud, and Security"
              description="We package engineering, infrastructure, and cyber operations into clear delivery tracks so teams can move faster without taking on fragile systems."
              align="left"
            />

            <div className="mt-7 grid gap-3">
              {deliveryPrinciples.map((item) => (
                <div key={item} className="service-principle-pill flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-cyber-muted">
                  <span className="service-principle-dot h-2.5 w-2.5 rounded-full" aria-hidden="true" />
                  <span className="font-medium text-cyber-text">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/services"
              className="group brand-cta mt-7 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-bold text-cyber-ink"
            >
              <span className="relative z-10 block">Book a Free Audit</span>
              <IconResolver name="ArrowRight" className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <Motion.div
          className="grid gap-5 sm:grid-cols-2 lg:col-span-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <Motion.article
              key={service.key}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="service-card group glass-card premium-shimmer relative flex flex-col overflow-hidden rounded-[1.9rem] border border-cyber-line/60 p-6 md:p-7 transition-all duration-500"
              style={{ '--service-accent': service.accent }}
            >
              <div
                className="absolute -right-12 -top-12 z-0 h-52 w-52 rounded-full opacity-20 blur-[60px] transition-all duration-700 group-hover:scale-150 group-hover:opacity-80"
                style={{ background: service.accent }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div
                    className="surface-panel inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyber-line bg-cyber-panel shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-[0_0_30px_var(--service-accent)]"
                    style={{ color: service.accent, borderColor: `color-mix(in srgb, ${service.accent} 50%, transparent)` }}
                  >
                    <IconResolver name={service.icon} className="h-6 w-6" />
                  </div>
                  <span className="service-accent-chip rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ '--service-accent': service.accent }}>
                    {serviceTagMap[service.key] ?? 'Service'}
                  </span>
                </div>

                <h3 className="service-card-title font-display text-[1.15rem] font-bold text-cyber-text tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 flex-grow text-[14px] leading-relaxed text-cyber-muted/95">
                  {service.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5 border-t border-cyber-line/25 pt-5">
                  {service.bullets.map((item) => (
                    <span
                      key={item}
                      className="service-bullet-pill rounded-full px-3 py-2 text-[11px] font-medium tracking-[0.08em]"
                      style={{ '--service-accent': service.accent }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-cyber-line/20 pt-4 text-[11px] uppercase tracking-[0.16em] text-cyber-muted">
                  <span>Outcome-Focused</span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
                    <span className="font-semibold text-cyber-text">Secure Delivery</span>
                  </span>
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

