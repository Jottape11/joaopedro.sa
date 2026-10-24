import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const RootLayout: React.FC = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-[var(--nf-bg)] text-[var(--nf-text)] transition-colors duration-200 selection:bg-[#E50914] selection:text-white">
      {!isLoginPage && <Navbar />}
      <main className={`flex-1 w-full ${isLoginPage || isHomePage ? 'p-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10'}`}>
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  )
}
