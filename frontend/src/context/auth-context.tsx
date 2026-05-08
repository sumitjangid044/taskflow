import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { authApi } from '@/api/auth'
import { TOKEN_KEY } from '@/lib/constants'
import type { LoginPayload, RegisterPayload, User } from '@/types/auth'

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<User>
  signup: (payload: RegisterPayload) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const readStoredToken = () => localStorage.getItem(TOKEN_KEY)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => readStoredToken())
  const [isLoading, setIsLoading] = useState(true)

  const setSession = useCallback((nextToken: string | null, nextUser: User | null) => {
    setToken(nextToken)
    setUser(nextUser)

    if (nextToken) {
      localStorage.setItem(TOKEN_KEY, nextToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }, [])

  const refreshUser = useCallback(async () => {
    const storedToken = readStoredToken()

    if (!storedToken) {
      setSession(null, null)
      setIsLoading(false)
      return
    }

    try {
      const nextUser = await authApi.me()
      setSession(storedToken, nextUser)
    } catch {
      setSession(null, null)
    } finally {
      setIsLoading(false)
    }
  }, [setSession])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await authApi.login(payload)
    setSession(response.token, response.user)
    return response.user
  }, [setSession])

  const signup = useCallback(async (payload: RegisterPayload) => {
    const response = await authApi.signup(payload)
    setSession(response.token, response.user)
    return response.user
  }, [setSession])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      setSession(null, null)
    }
  }, [setSession])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [isLoading, login, logout, refreshUser, signup, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
