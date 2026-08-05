<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategoriasStore } from '../stores/categorias.store'
import CategoriaForm from '../components/categorias/CategoriaForm.vue'
import CategoriaList from '../components/categorias/CategoriaList.vue'
import type { Categoria } from '../types'

const categoriasStore = useCategoriasStore()
const editing = ref<Categoria | null>(null)

onMounted(() => {
  categoriasStore.fetchCategorias()
})

async function onSubmit(nombre: string) {
  try {
    if (editing.value) {
      await categoriasStore.updateCategoria(editing.value.id, nombre)
      editing.value = null
    } else {
      await categoriasStore.createCategoria(nombre)
    }
  } catch {
    // categoriasStore.error ya contiene el mensaje para el usuario
  }
}

function onEdit(categoria: Categoria) {
  editing.value = categoria
}

function onCancelEdit() {
  editing.value = null
}

async function onDelete(categoria: Categoria) {
  if (!confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) return
  try {
    await categoriasStore.deleteCategoria(categoria.id)
    if (editing.value?.id === categoria.id) editing.value = null
  } catch {
    // categoriasStore.error ya contiene el mensaje para el usuario
  }
}
</script>

<template>
  <div class="categorias-view">
    <h1>Categorías</h1>

    <CategoriaForm
      :categoria="editing"
      :loading="categoriasStore.loading"
      @submit="onSubmit"
      @cancel="onCancelEdit"
    />

    <p v-if="categoriasStore.error" class="form-error">{{ categoriasStore.error }}</p>
    <p v-if="categoriasStore.loading" class="loading-state">Cargando…</p>

    <CategoriaList
      :categorias="categoriasStore.categorias"
      :loading="categoriasStore.loading"
      @edit="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<style scoped>
.categorias-view {
  max-width: 560px;
  margin: 0 auto;
}

.form-error {
  color: var(--danger);
}

.loading-state {
  color: var(--text-muted);
}
</style>
