/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

const MOCK_EMAIL = 'admin@aitoolshub.com'
const MOCK_PASSWORD = 'admin123'
const STORAGE_KEY = 'ai-tools-hub:auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isAuthenticated))
    } catch {
      // storage unavailable
    }
  }, [isAuthenticated])

  const login = useCallback((email: string, password: string): boolean => {
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
