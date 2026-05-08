export type Role = 'admin' | 'member'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role?: Role
}
