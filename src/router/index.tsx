import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { PrivateRoute } from '@/components/common/PrivateRoute'
import { SuspenseWrapper } from '@/components/common/SuspenseWrapper'

// Code-splitting por rota via React.lazy() (Atende ao Requisito 8: carregamento sob demanda fora do pacote inicial)
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const Projects = lazy(() => import('@/pages/Projects').then(m => ({ default: m.Projects })))
const ProjectDetails = lazy(() => import('@/pages/ProjectDetails').then(m => ({ default: m.ProjectDetails })))
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })))
const Login = lazy(() => import('@/pages/Login').then(m => ({ default: m.Login })))
const Dashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'projetos',
        element: (
          <SuspenseWrapper>
            <Projects />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'projetos/:id',
        element: (
          <SuspenseWrapper>
            <ProjectDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'contato',
        element: (
          <SuspenseWrapper>
            <Contact />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'login',
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <SuspenseWrapper>
              <Dashboard />
            </SuspenseWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])
