import { motion as Motion } from 'framer-motion'
import {
  Atom,
  BrainCircuit,
  Braces,
  Boxes,
  Cloud,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  Server,
  Workflow,
} from 'lucide-react'
import { techStack } from '../data/company'
import SectionHeading from './SectionHeading'

const iconMap = {
  Atom,
  Server,
  Braces,
  Globe,
  Cloud,
  Layers,
  Boxes,
  Workflow,
  BrainCircuit,
  Database,
  Cpu,
  FileCode2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: 'easeOut' },
  },
}

const stackDescriptions = {
  Frontend: 'Responsive, conversion-aware UI systems built for fast iteration and clean handoff.',
  Backend: 'Reliable service layers, APIs, and runtime foundations designed to stay maintainable under growth.',
  Automation: 'Workflow scripting and operational tooling that remove repetitive work from delivery teams.',
  Cloud: 'Platform-ready cloud services for hosting, scaling, observability, and resilience.',
  Containers: 'Portable packaging for applications that need repeatable environments from local to production.',
  Orchestration: 'Cluster coordination and deployment automation for teams running modern distributed systems.',
  'AI/ML': 'Applied AI tooling for model workflows, experimentation, and production-ready intelligence features.',
  Database: 'Durable data layers built for query performance, reliability, and structured growth.',
  Caching: 'Latency reduction and workload smoothing for APIs, products, and session-heavy platforms.',
  Language: 'Strong typing and maintainable developer experience for product teams shipping at speed.',
}

export default function TechStackSection() {
  return (
    <section className="cyber-noise border-y border-cyber-line/60 py-20" aria-labelledby="stack-title">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Modern Tools for Modern Problems"
          description="We combine proven frameworks with cloud-native tooling to ship secure systems that scale under real-world demand."
          align="center"
        />

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {techStack.map((tool) => (
            <Motion.article
              key={tool.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="tech-tile tech-stack-card group relative flex min-h-[210px] flex-col overflow-hidden rounded-[1.75rem] border border-cyber-line p-5"
              style={{ '--stack-color': tool.color }}
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition duration-300 group-hover:opacity-60" style={{ background: tool.color }} />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="surface-panel tech-stack-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyber-line text-2xl">
                    <StackIcon name={tool.icon} color={tool.color} />
                  </div>
                  <div>
                    <p className="font-display text-base text-cyber-text">{tool.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-cyber-muted">Production-ready</p>
                  </div>
                </div>
                <span className="stack-category-badge rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ '--stack-color': tool.color }}>
                  {tool.category}
                </span>
              </div>

              <p className="relative mt-5 text-sm leading-relaxed text-cyber-muted/95">
                {stackDescriptions[tool.category] ?? 'Modern tooling selected for speed, reliability, and long-term maintainability.'}
              </p>

              <div className="relative mt-auto flex flex-wrap gap-2 pt-5">
                <span className="stack-signal-pill rounded-full px-3 py-1.5 text-[11px] font-medium" style={{ '--stack-color': tool.color }}>
                  Secure by default
                </span>
                <span className="stack-signal-pill rounded-full px-3 py-1.5 text-[11px] font-medium" style={{ '--stack-color': tool.color }}>
                  Fast delivery
                </span>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

function StackIcon({ name, color }) {
  const Icon = iconMap[name]

  if (!Icon) {
    return <span className="font-display text-xs text-cyber-text">TS</span>
  }

  return <Icon style={{ color }} aria-hidden="true" />
}

