import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Preloader from './components/Preloader'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<RouteFallback />}>
            <HomePage />
          </Suspense>
        ) 
      },
      { 
        path: 'services', 
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ServicesPage />
          </Suspense>
        ) 
      },
      { 
        path: 'about', 
        element: (
          <Suspense fallback={<RouteFallback />}>
            <AboutPage />
          </Suspense>
        ) 
      },
      { 
        path: 'contact', 
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ContactPage />
          </Suspense>
        ) 
      },
      { 
        path: '*', 
        element: (
          <Suspense fallback={<RouteFallback />}>
            <NotFoundPage />
          </Suspense>
        ) 
      },
    ],
  },
])

const PRELOADER_KEY = 'cytroksys-preloader-seen'
const MIN_PRELOADER_MS = 320
const MAX_PRELOADER_MS = 1200
const MOBILE_QUERY = '(max-width: 768px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function shouldShowPreloader() {
  if (typeof window === 'undefined') {
    return false
  }

  const seenPreloader = window.sessionStorage.getItem(PRELOADER_KEY)
  if (seenPreloader) {
    return false
  }

  const isMobile = window.matchMedia(MOBILE_QUERY).matches
  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

  return !isMobile && !prefersReducedMotion
}

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-cyber-muted">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyber-cyan border-t-transparent"></div>
        <p className="font-display text-[10px] uppercase tracking-[0.2em]">Initialising Modules...</p>
      </div>
    </div>
  )
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => shouldShowPreloader())

  useEffect(() => {
    if (!showPreloader) {
      return
    }

    const startedAt = performance.now()
    let settled = false
    let settleTimer = 0

    const finish = () => {
      if (settled) {
        return
      }

      settled = true
      window.sessionStorage.setItem(PRELOADER_KEY, 'true')
      setShowPreloader(false)
    }

    const onLoaded = () => {
      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, MIN_PRELOADER_MS - elapsed)
      settleTimer = window.setTimeout(finish, remaining)
    }

    const maxTimer = window.setTimeout(finish, MAX_PRELOADER_MS)

    if (document.readyState === 'complete') {
      onLoaded()
    } else {
      window.addEventListener('load', onLoaded, { once: true })
    }

    return () => {
      settled = true
      window.clearTimeout(settleTimer)
      window.clearTimeout(maxTimer)
      window.removeEventListener('load', onLoaded)
    }
  }, [showPreloader])

  return (
    <>
      <RouterProvider router={router} />
      <AnimatePresence>
        {showPreloader ? <Preloader key="preloader" /> : null}
      </AnimatePresence>
    </>
  )
}

