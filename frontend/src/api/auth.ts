import { api } from './client'
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth'

export const authApi = {
  signup: async (payload: RegisterPayload) => {
    const response = await api.post<AuthResponse>('/auth/signup', payload)
    return response.data
  },
  login: async (payload: LoginPayload) => {
    const response = await api.post<AuthResponse>('/auth/login', payload)
    return response.data
  },
  me: async () => {
    const response = await api.get<{ user: AuthResponse['user'] }>('/auth/me')
    return response.data.user
  },
  logout: async () => {
    const response = await api.post<{ message: string }>('/auth/logout')
    return response.data
  },
}
