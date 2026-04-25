import { Link } from 'react-router-dom'
import { contactDetails, navItems, socialLinks } from '../data/company'
import { IconResolver } from './IconResolver'

const footerCapabilities = ['React product builds', 'Node API delivery', 'Cloud operations', 'Zero-trust security']

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="theme-sheen-aurora border-t border-cyber-line bg-cyber-panel/80">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1.5fr_0.9fr_1fr_1fr] md:px-6">
        <div className="footer-brand-panel rounded-[2rem] border border-cyber-line/70 p-6 md:p-7 lg:col-span-1">
          <Link to="/" className="mb-6 inline-flex items-center gap-3">
            <img src="/logo-nav.png" alt="Cytroksys Logo" width="44" height="44" loading="lazy" decoding="async" className="h-11 w-11 rounded-full shadow-glow" />
            <span>
              <span className="block font-display text-xl tracking-tight text-cyber-text">Cytroksys</span>
              <span className="block text-xs uppercase tracking-[0.18em] text-cyber-muted">Infotech</span>
            </span>
          </Link>

          <p className="max-w-md text-sm leading-relaxed text-cyber-muted">
            Enterprise-grade digital solutions for teams that need to ship fast without compromising reliability or security.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {footerCapabilities.map((capability) => (
              <span key={capability} className="footer-stack-badge rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                {capability}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="footer-contact-card rounded-2xl px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyber-muted">Email</p>
              <a href={`mailto:${contactDetails.email}`} className="mt-2 inline-block text-sm text-cyber-text transition hover:text-cyber-cyan">
                {contactDetails.email}
              </a>
            </div>
            <div className="footer-contact-card rounded-2xl px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyber-muted">Call</p>
              <a href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`} className="mt-2 inline-block text-sm text-cyber-text transition hover:text-cyber-cyan">
                {contactDetails.phone}
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cyber-cyan">Navigation</p>
          <ul className="footer-link-list mt-4 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-cyber-muted transition hover:text-cyber-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cyber-cyan">Capabilities</p>
          <ul className="footer-link-list mt-4 space-y-3 text-sm text-cyber-muted">
            {footerCapabilities.map((capability) => (
              <li key={capability}>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cyber-cyan">Follow</p>
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((link) => {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${link.label}`}
                  className="surface-panel inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyber-line bg-cyber-ink text-cyber-muted transition hover:border-cyber-cyan hover:text-cyber-cyan"
                >
                  <IconResolver name={link.icon} className="h-4 w-4" />
                </a>
              )
            })}
          </div>
          <p className="mt-4 text-sm text-cyber-muted">Visit: suryaprakashinfo.in</p>
          <p className="footer-meta-line mt-3 text-xs uppercase tracking-[0.18em] text-cyber-muted">Pudukkottai, India</p>
        </div>
      </div>

      <div className="border-t border-cyber-line/80 px-4 py-4 text-center text-xs text-cyber-muted md:px-6">
        © {currentYear} Cytroksys Infotech. All rights reserved.
      </div>
    </footer>
  )
}

