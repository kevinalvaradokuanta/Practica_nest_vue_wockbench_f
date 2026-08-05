<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategoriasStore } from '../stores/categorias.store'
import { useTareasStore } from '../stores/tareas.store'
import TareaForm from '../components/tareas/TareaForm.vue'
import TareaList from '../components/tareas/TareaList.vue'
import TareaFilterByCategoria from '../components/tareas/TareaFilterByCategoria.vue'
import type { CreateTareaPayload, Tarea } from '../types'

const categoriasStore = useCategoriasStore()
const tareasStore = useTareasStore()

const editing = ref<Tarea | null>(null)
const categoriaFiltro = ref<number | null>(null)

onMounted(() => {
  categoriasStore.fetchCategorias()
  tareasStore.fetchTareas()
})

function onFiltroChange(categoriaId: number | null) {
  categoriaFiltro.value = categoriaId
  tareasStore.fetchTareas(categoriaId ?? undefined)
}

async function onSubmit(payload: CreateTareaPayload) {
  try {
    if (editing.value) {
      await tareasStore.updateTarea(editing.value.id, payload)
      editing.value = null
    } else {
      await tareasStore.createTarea(payload)
    }
  } catch {
    // tareasStore.error ya contiene el mensaje para el usuario
  }
}

function onEdit(tarea: Tarea) {
  editing.value = tarea
}

function onCancelEdit() {
  editing.value = null
}

async function onDelete(tarea: Tarea) {
  if (!confirm(`¿Eliminar la tarea "${tarea.titulo}"?`)) return
  try {
    await tareasStore.deleteTarea(tarea.id)
    if (editing.value?.id === tarea.id) editing.value = null
  } catch {
    // tareasStore.error ya contiene el mensaje para el usuario
  }
}

async function onToggleEstado(tarea: Tarea) {
  const nuevoEstado = tarea.estado === 'completada' ? 'pendiente' : 'completada'
  try {
    await tareasStore.updateTarea(tarea.id, { estado: nuevoEstado })
  } catch {
    // tareasStore.error ya contiene el mensaje para el usuario
  }
}
</script>

<template>
  <div class="tareas-view">
    <h1>Tareas</h1>

    <TareaForm
      :tarea="editing"
      :categorias="categoriasStore.categorias"
      :loading="tareasStore.loading"
      @submit="onSubmit"
      @cancel="onCancelEdit"
    />

    <TareaFilterByCategoria
      :categorias="categoriasStore.categorias"
      :model-value="categoriaFiltro"
      @update:model-value="onFiltroChange"
    />

    <p v-if="tareasStore.error" class="form-error">{{ tareasStore.error }}</p>
    <p v-if="tareasStore.loading" class="loading-state">Cargando…</p>

    <TareaList
      :tareas="tareasStore.tareas"
      :loading="tareasStore.loading"
      @edit="onEdit"
      @delete="onDelete"
      @toggle-estado="onToggleEstado"
    />
  </div>
</template>

<style scoped>
.tareas-view {
  max-width: 720px;
  margin: 0 auto;
}

.form-error {
  color: var(--danger);
}

.loading-state {
  color: var(--text-muted);
}
</style>
