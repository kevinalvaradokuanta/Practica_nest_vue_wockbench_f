import { defineStore } from 'pinia'
import * as categoriasApi from '../api/categorias.api'
import type { Categoria } from '../types'

export const useCategoriasStore = defineStore('categorias', {
  state: () => ({
    categorias: [] as Categoria[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchCategorias() {
      this.loading = true
      this.error = null
      try {
        this.categorias = await categoriasApi.getCategorias()
      } catch {
        this.error = 'No se pudieron cargar las categorías.'
      } finally {
        this.loading = false
      }
    },
    async createCategoria(nombre: string) {
      this.loading = true
      this.error = null
      try {
        const categoria = await categoriasApi.createCategoria(nombre)
        this.categorias.push(categoria)
      } catch {
        this.error = 'No se pudo crear la categoría.'
        throw new Error('create-categoria-failed')
      } finally {
        this.loading = false
      }
    },
    async updateCategoria(id: number, nombre: string) {
      this.loading = true
      this.error = null
      try {
        const categoria = await categoriasApi.updateCategoria(id, nombre)
        const index = this.categorias.findIndex((c) => c.id === id)
        if (index !== -1) this.categorias[index] = categoria
      } catch {
        this.error = 'No se pudo actualizar la categoría.'
        throw new Error('update-categoria-failed')
      } finally {
        this.loading = false
      }
    },
    async deleteCategoria(id: number) {
      this.loading = true
      this.error = null
      try {
        await categoriasApi.deleteCategoria(id)
        this.categorias = this.categorias.filter((c) => c.id !== id)
      } catch {
        this.error = 'No se pudo eliminar la categoría.'
        throw new Error('delete-categoria-failed')
      } finally {
        this.loading = false
      }
    },
  },
})
