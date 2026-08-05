<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Categoria, CreateTareaPayload, EstadoTarea, Tarea } from '../../types'

const props = defineProps<{
  tarea?: Tarea | null
  categorias: Categoria[]
  loading: boolean
}>()

const emit = defineEmits<{
  submit: [payload: CreateTareaPayload]
  cancel: []
}>()

function toDateInputValue(iso?: string) {
  return iso ? iso.slice(0, 10) : ''
}

const titulo = ref(props.tarea?.titulo ?? '')
const descripcion = ref(props.tarea?.descripcion ?? '')
const estado = ref<EstadoTarea>(props.tarea?.estado ?? 'pendiente')
const fechaLimite = ref(toDateInputValue(props.tarea?.fechaLimite))
const categoriaId = ref<number | ''>(props.tarea?.categoriaId ?? '')
const touched = ref(false)

watch(
  () => props.tarea,
  (tarea) => {
    titulo.value = tarea?.titulo ?? ''
    descripcion.value = tarea?.descripcion ?? ''
    estado.value = tarea?.estado ?? 'pendiente'
    fechaLimite.value = toDateInputValue(tarea?.fechaLimite)
    categoriaId.value = tarea?.categoriaId ?? ''
    touched.value = false
  },
)

const formValid = computed(
  () => titulo.value.trim().length > 0 && fechaLimite.value.length > 0 && categoriaId.value !== '',
)

function onSubmit() {
  touched.value = true
  if (!formValid.value) return

  emit('submit', {
    titulo: titulo.value.trim(),
    descripcion: descripcion.value.trim(),
    estado: estado.value,
    fechaLimite: fechaLimite.value,
    categoriaId: categoriaId.value as number,
  })
}
</script>

<template>
  <form class="tarea-form" novalidate @submit.prevent="onSubmit">
    <label>
      Título
      <input v-model="titulo" type="text" placeholder="Título de la tarea" />
      <span v-if="touched && titulo.trim().length === 0" class="field-error">
        El título es requerido.
      </span>
    </label>

    <label>
      Descripción
      <textarea v-model="descripcion" rows="2" placeholder="Descripción (opcional)" />
    </label>

    <div class="tarea-form-row">
      <label>
        Estado
        <select v-model="estado">
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
      </label>

      <label>
        Fecha límite
        <input v-model="fechaLimite" type="date" />
        <span v-if="touched && fechaLimite.length === 0" class="field-error">Requerida.</span>
      </label>

      <label>
        Categoría
        <select v-model="categoriaId">
          <option value="" disabled>Selecciona una categoría</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.nombre }}
          </option>
        </select>
        <span v-if="touched && categoriaId === ''" class="field-error">Requerida.</span>
      </label>
    </div>

    <div class="tarea-form-actions">
      <button type="submit" :disabled="loading">
        {{ tarea ? 'Guardar cambios' : 'Crear tarea' }}
      </button>
      <button v-if="tarea" type="button" class="secondary" @click="emit('cancel')">
        Cancelar
      </button>
    </div>
  </form>
</template>

<style scoped>
.tarea-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: var(--text-muted);
  flex: 1;
}

input,
select,
textarea {
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-family: inherit;
}

.tarea-form-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.field-error {
  color: var(--danger);
  font-size: 13px;
}

.tarea-form-actions {
  display: flex;
  gap: 8px;
}

button[type='submit'] {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: var(--accent);
  color: var(--accent-contrast);
  font-weight: 600;
}

button[type='submit']:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.secondary {
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: none;
  color: var(--text);
}
</style>
