import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

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
        
        {/* Left Sticky Header */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 flex flex-col items-start gap-8">
            <SectionHeading
              eyebrow="Our Expertise"
              title="AI-Powered Services, Built for Scale"
              description="From product engineering to zero-trust security, our teams deliver measurable outcomes with speed, transparency, and enterprise-grade reliability."
              align="left"
            />
            
            <Link
              to="/services"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-8 py-3.5 text-sm font-bold text-cyber-text transition-all hover:border-cyber-cyan hover:bg-cyber-cyan/20 hover:shadow-glow/40"
            >
              <span className="relative z-10 block">Book a Free Audit</span>
              <IconResolver name="ArrowRight" className="relative z-10 h-4 w-4 text-cyber-cyan transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Scrollable Cards Grid */}
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
              className="group glass-card premium-shimmer relative flex flex-col overflow-hidden rounded-3xl border border-cyber-line/50 p-6 md:p-8 transition-all duration-500 hover:border-cyber-cyan/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]"
              style={{ '--service-accent': service.accent }}
            >
              <div
                className="absolute -right-20 -top-20 z-0 h-44 w-44 rounded-full blur-[70px] transition-opacity duration-700 group-hover:opacity-70 opacity-10"
                style={{ background: service.accent }}
              />
              
              <div className="relative z-10 flex h-full flex-col">
                <div
                  className="surface-panel mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyber-line bg-cyber-panel shadow-inner transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                  style={{ color: service.accent, borderColor: `color-mix(in srgb, ${service.accent} 40%, transparent)` }}
                >
                  <IconResolver name={service.icon} className="h-5 w-5" />
                </div>
                
                <h3 className="font-display text-[1.15rem] font-bold text-cyber-text tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyber-cyan transition-all duration-300">
                  {service.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-cyber-muted/80 flex-grow">
                  {service.summary}
                </p>
                
                <div className="mt-8 pt-5 border-t border-cyber-line/20">
                  <ul className="flex flex-col gap-2.5">
                    {service.bullets.map((item) => (
                      <li 
                        key={item} 
                        className="flex items-start gap-2.5 text-[12px] font-medium tracking-wide text-cyber-muted/70 transition-colors group-hover:text-cyber-text/90"
                      >
                        <IconResolver name="BadgeCheck" className="h-4 w-4 shrink-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100" style={{ color: service.accent }} />
                        <span className="mt-[1px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>

      </div>
    </section>
  )
}

