import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { Home } from '@/pages/Home'
import { Projects } from '@/pages/Projects'
import { ProjectDetails } from '@/pages/ProjectDetails'
import { Contact } from '@/pages/Contact'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { NotFound } from '@/pages/NotFound'
import { PrivateRoute } from '@/components/common/PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projetos', element: <Projects /> },
      { path: 'projetos/:id', element: <ProjectDetails /> },
      { path: 'contato', element: <Contact /> },
      { path: 'login', element: <Login /> },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
