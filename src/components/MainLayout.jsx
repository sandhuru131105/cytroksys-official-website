import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollProgressBar from './ScrollProgressBar'
import ScrollToTop from './ScrollToTop'
import AuroraBackground from './AuroraBackground'

const VyanaAssistant = lazy(() => import('./VyanaAssistant'))

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cyber-ink text-cyber-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[75] focus:rounded-md focus:bg-cyber-cyan focus:px-4 focus:py-2 focus:text-cyber-ink"
      >
        Skip to content
      </a>
      <AuroraBackground />
      <ScrollToTop />
      <ScrollProgressBar />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" className="relative">
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <VyanaAssistant />
      </Suspense>
    </div>
  )
}
