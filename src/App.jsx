import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'

// Main site pages
const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Store feature
const StoreLayout = lazy(() => import('./features/store/components/StoreLayout'))
const StorePage = lazy(() => import('./features/store/pages/StorePage'))
const ProductDetailPage = lazy(() => import('./features/store/pages/ProductDetailPage'))

// Auth feature
const AdminLoginPage = lazy(() => import('./features/auth/pages/AdminLoginPage'))
import ProtectedRoute from './features/auth/components/ProtectedRoute'

// Admin feature
const AdminLayout = lazy(() => import('./features/admin/components/AdminLayout'))
const DashboardPage = lazy(() => import('./features/admin/pages/DashboardPage'))
const ProductsListPage = lazy(() => import('./features/admin/pages/ProductsListPage'))
const ProductFormPage = lazy(() => import('./features/admin/pages/ProductFormPage'))
const OrdersListPage = lazy(() => import('./features/admin/pages/OrdersListPage'))
const OrderDetailPage = lazy(() => import('./features/admin/pages/OrderDetailPage'))

const router = createBrowserRouter([
  // ── Main site ──────────────────────────────────────────────
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<RouteFallback />}><HomePage /></Suspense>,
      },
      {
        path: 'services',
        element: <Suspense fallback={<RouteFallback />}><ServicesPage /></Suspense>,
      },
      {
        path: 'about',
        element: <Suspense fallback={<RouteFallback />}><AboutPage /></Suspense>,
      },
      {
        path: 'contact',
        element: <Suspense fallback={<RouteFallback />}><ContactPage /></Suspense>,
      },
      {
        path: '*',
        element: <Suspense fallback={<RouteFallback />}><NotFoundPage /></Suspense>,
      },
    ],
  },

  // ── Digital Store ──────────────────────────────────────────
  {
    path: '/store',
    element: <Suspense fallback={<RouteFallback />}><StoreLayout /></Suspense>,
    children: [
      {
        index: true,
        element: <Suspense fallback={<RouteFallback />}><StorePage /></Suspense>,
      },
      {
        path: ':slug',
        element: <Suspense fallback={<RouteFallback />}><ProductDetailPage /></Suspense>,
      },
    ],
  },

  // ── Admin Panel ────────────────────────────────────────────
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <Suspense fallback={<RouteFallback />}><AdminLoginPage /></Suspense>,
      },
      {
        path: '',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <Suspense fallback={<RouteFallback />}><DashboardPage /></Suspense>,
          },
          {
            path: 'products',
            element: <Suspense fallback={<RouteFallback />}><ProductsListPage /></Suspense>,
          },
          {
            path: 'products/new',
            element: <Suspense fallback={<RouteFallback />}><ProductFormPage /></Suspense>,
          },
          {
            path: 'products/:id/edit',
            element: <Suspense fallback={<RouteFallback />}><ProductFormPage /></Suspense>,
          },
          {
            path: 'orders',
            element: <Suspense fallback={<RouteFallback />}><OrdersListPage /></Suspense>,
          },
          {
            path: 'orders/:id',
            element: <Suspense fallback={<RouteFallback />}><OrderDetailPage /></Suspense>,
          },
        ],
      },
    ],
  },
])

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-cyber-muted">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyber-cyan border-t-transparent" />
        <p className="font-display text-[10px] uppercase tracking-[0.2em]">Initialising Modules...</p>
      </div>
    </div>
  )
}

export default function App() {
  return <RouterProvider router={router} />
}
