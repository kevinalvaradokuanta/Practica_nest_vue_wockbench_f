import { defineStore } from 'pinia'
import * as authApi from '../api/auth.api'
import type { Usuario } from '../types'

const USUARIO_KEY = 'usuario'
const TOKEN_KEY = 'token'

function loadUsuario(): Usuario | null {
  const raw = localStorage.getItem(USUARIO_KEY)
  return raw ? (JSON.parse(raw) as Usuario) : null
}

function decodeUsuarioFromToken(token: string): Usuario {
  const payload = JSON.parse(atob(token.split('.')[1])) as { sub: number; email: string }
  return { id: payload.sub, email: payload.email }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: loadUsuario() as Usuario | null,
    token: localStorage.getItem(TOKEN_KEY) as string | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const { accessToken } = await authApi.login({ email, password })
        this.setSession(accessToken, decodeUsuarioFromToken(accessToken))
      } catch (err: any) {
        this.error = err.response?.status === 401
          ? 'Credenciales inválidas.'
          : 'No se pudo iniciar sesión. Intenta de nuevo.'
        throw err
      } finally {
        this.loading = false
      }
    },
    async register(nombre: string, email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        await authApi.register({ nombre, email, password })
      } catch (err: any) {
        this.error = err.response?.status === 409
          ? 'Ese email ya está registrado.'
          : 'No se pudo completar el registro. Intenta de nuevo.'
        throw err
      } finally {
        this.loading = false
      }
    },
    setSession(token: string, usuario: Usuario) {
      this.token = token
      this.usuario = usuario
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario))
    },
    logout() {
      this.token = null
      this.usuario = null
      this.error = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USUARIO_KEY)
    },
  },
})
