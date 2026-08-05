<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Categoria } from '../../types'

const props = defineProps<{
  categoria?: Categoria | null
  loading: boolean
}>()

const emit = defineEmits<{
  submit: [nombre: string]
  cancel: []
}>()

const nombre = ref(props.categoria?.nombre ?? '')
const touched = ref(false)

watch(
  () => props.categoria,
  (categoria) => {
    nombre.value = categoria?.nombre ?? ''
    touched.value = false
  },
)

function onSubmit() {
  touched.value = true
  if (nombre.value.trim().length === 0) return
  emit('submit', nombre.value.trim())
}
</script>

<template>
  <form class="categoria-form" novalidate @submit.prevent="onSubmit">
    <label>
      Nombre
      <input v-model="nombre" type="text" placeholder="Nombre de la categoría" />
      <span v-if="touched && nombre.trim().length === 0" class="field-error">
        El nombre es requerido.
      </span>
    </label>

    <div class="categoria-form-actions">
      <button type="submit" :disabled="loading">
        {{ categoria ? 'Guardar cambios' : 'Crear categoría' }}
      </button>
      <button v-if="categoria" type="button" class="secondary" @click="emit('cancel')">
        Cancelar
      </button>
    </div>
  </form>
</template>

<style scoped>
.categoria-form {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: var(--text-muted);
  flex: 1;
}

input {
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
}

.field-error {
  color: var(--danger);
  font-size: 13px;
}

.categoria-form-actions {
  display: flex;
  gap: 8px;
  padding-top: 22px;
}

button[type='submit'] {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: var(--accent);
  color: var(--accent-contrast);
  font-weight: 600;
  white-space: nowrap;
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
