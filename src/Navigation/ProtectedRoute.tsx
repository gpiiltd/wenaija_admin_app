import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    const { exp } = JSON.parse(jsonPayload)
    const currentTime = Math.floor(Date.now() / 1000)

    return exp < currentTime
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return true
  }
}

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('nssf_user_token')

      const isValid =
        Boolean(accessToken) && !isTokenExpired(accessToken as string)

      setIsAuthenticated(isValid)
      setIsLoading(false)

      if (!isValid && location.pathname !== '/') {
        localStorage.removeItem('nssf_user_token')
        localStorage.removeItem('nssf_refresh_token')
        sessionStorage.setItem('redirectAfterLogin', location.pathname)
        navigate('/', { replace: true })
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nssf_user_token') {
        checkAuth()
      }
    }

    checkAuth()

    window.addEventListener('storage', handleStorageChange)

    const intervalId = setInterval(() => {
      const accessToken = localStorage.getItem('nssf_user_token')
      if (accessToken && isTokenExpired(accessToken)) {
        localStorage.removeItem('nssf_user_token')
        localStorage.removeItem('nssf_refresh_token')
        sessionStorage.setItem('redirectAfterLogin', location.pathname)
        navigate('/', { replace: true })
      }
    }, 60000) // Check every minute

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(intervalId)
    }
  }, [navigate, location.pathname])

  if (isLoading || isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
