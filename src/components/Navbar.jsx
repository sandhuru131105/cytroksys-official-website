import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../data/company'
import { IconResolver } from './IconResolver'

const linkClass = ({ isActive }) =>
  `navbar-link-pill relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold tracking-[0.01em] transition-all duration-300 ${
    isActive ? 'is-active text-white' : 'text-cyber-muted hover:text-cyber-text'
  }`

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`header-shell sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'navbar-scrolled backdrop-blur-2xl'
          : 'backdrop-blur-xl'
      }`}
    >
      <div className="navbar-inner mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" aria-label="Go to Cytroksys homepage" className="navbar-brand group inline-flex items-center gap-3 rounded-[1.4rem] px-2 py-1.5">
          <div className="navbar-logo-ring relative shrink-0">
            <img 
              src="/logo-nav.png" 
              alt="Cytroksys Logo" 
              width="40"
              height="40"
              decoding="async"
              className="site-logo-clean h-10 w-10 rounded-full object-contain"
            />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="font-display text-sm uppercase tracking-[0.16em] text-cyber-text transition-colors duration-300 group-hover:text-cyber-cyan">Cytroksys</p>
            <p className="text-xs tracking-[0.12em] text-cyber-muted">Infotech</p>
          </div>
        </Link>

        <nav className="navbar-nav-shell hidden items-center gap-2 rounded-full px-2 py-1.5 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <Motion.span
                      layoutId="nav-active-indicator"
                      className="navbar-active-indicator absolute inset-0 -z-10 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle-btn surface-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyber-line/75 bg-cyber-panel text-cyber-text transition hover:border-cyber-cyan hover:shadow-glow/30"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IconResolver name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-4 w-4" />
            </Motion.div>
          </button>
          <Link
            to="/contact"
            className="brand-cta premium-shimmer inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-cyber-ink transition"
          >
            Get a Quote
            <IconResolver name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
          className="surface-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyber-line/75 bg-cyber-panel text-cyber-text transition hover:border-cyber-cyan md:hidden"
        >
          <IconResolver name={open ? 'X' : 'Menu'} className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <Motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="navbar-mobile-panel overflow-hidden px-4 pb-4 pt-3 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="surface-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyber-line/75 bg-cyber-ink text-cyber-text"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  <IconResolver name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-4 w-4" />
                </button>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="brand-cta premium-shimmer inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-cyber-ink"
                >
                  Get a Quote
                  <IconResolver name="ArrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
