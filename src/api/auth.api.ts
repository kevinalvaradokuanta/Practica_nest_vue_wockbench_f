import api from './axios'
import type { RegisterResponse, LoginResponse } from '../types'

export interface RegisterPayload {
  nombre: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export function register(payload: RegisterPayload) {
  return api.post<RegisterResponse>('/auth/register', payload).then((res) => res.data)
}

export function login(payload: LoginPayload) {
  return api.post<LoginResponse>('/auth/login', payload).then((res) => res.data)
}
