import api from './axios'
import type { Categoria } from '../types'

export function getCategorias() {
  return api.get<Categoria[]>('/categorias').then((res) => res.data)
}

export function createCategoria(nombre: string) {
  return api.post<Categoria>('/categorias', { nombre }).then((res) => res.data)
}

export function updateCategoria(id: number, nombre: string) {
  return api.patch<Categoria>(`/categorias/${id}`, { nombre }).then((res) => res.data)
}

export function deleteCategoria(id: number) {
  return api.delete(`/categorias/${id}`)
}
