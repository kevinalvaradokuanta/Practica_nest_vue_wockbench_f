import { defineStore } from 'pinia'
import * as tareasApi from '../api/tareas.api'
import type { CreateTareaPayload, Tarea, UpdateTareaPayload } from '../types'

export const useTareasStore = defineStore('tareas', {
  state: () => ({
    tareas: [] as Tarea[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTareas(categoriaId?: number) {
      this.loading = true
      this.error = null
      try {
        this.tareas = await tareasApi.getTareas(categoriaId)
      } catch {
        this.error = 'No se pudieron cargar las tareas.'
      } finally {
        this.loading = false
      }
    },
    async createTarea(payload: CreateTareaPayload) {
      this.loading = true
      this.error = null
      try {
        const tarea = await tareasApi.createTarea(payload)
        this.tareas.push(tarea)
      } catch {
        this.error = 'No se pudo crear la tarea.'
        throw new Error('create-tarea-failed')
      } finally {
        this.loading = false
      }
    },
    async updateTarea(id: number, payload: UpdateTareaPayload) {
      this.loading = true
      this.error = null
      try {
        const tarea = await tareasApi.updateTarea(id, payload)
        const index = this.tareas.findIndex((t) => t.id === id)
        if (index !== -1) this.tareas[index] = tarea
      } catch {
        this.error = 'No se pudo actualizar la tarea.'
        throw new Error('update-tarea-failed')
      } finally {
        this.loading = false
      }
    },
    async deleteTarea(id: number) {
      this.loading = true
      this.error = null
      try {
        await tareasApi.deleteTarea(id)
        this.tareas = this.tareas.filter((t) => t.id !== id)
      } catch {
        this.error = 'No se pudo eliminar la tarea.'
        throw new Error('delete-tarea-failed')
      } finally {
        this.loading = false
      }
    },
  },
})
