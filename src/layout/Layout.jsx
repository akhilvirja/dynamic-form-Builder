import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

function Layout({ children }) {
  const location = useLocation()
  const isViewer = location.pathname.startsWith('/form/')

  if (isViewer) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
