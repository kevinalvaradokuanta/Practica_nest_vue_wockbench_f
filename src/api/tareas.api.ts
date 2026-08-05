import api from './axios'
import type { CreateTareaPayload, Tarea, UpdateTareaPayload } from '../types'

export function getTareas(categoriaId?: number) {
  const params = categoriaId !== undefined ? { categoria_id: categoriaId } : undefined
  return api.get<Tarea[]>('/tareas', { params }).then((res) => res.data)
}

export function createTarea(payload: CreateTareaPayload) {
  return api.post<Tarea>('/tareas', payload).then((res) => res.data)
}

export function updateTarea(id: number, payload: UpdateTareaPayload) {
  return api.patch<Tarea>(`/tareas/${id}`, payload).then((res) => res.data)
}

export function deleteTarea(id: number) {
  return api.delete(`/tareas/${id}`)
}
