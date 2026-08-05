<script setup lang="ts">
import type { Categoria } from '../../types'

defineProps<{
  categorias: Categoria[]
  modelValue: number | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value === '' ? null : Number(value))
}
</script>

<template>
  <label class="tarea-filter">
    Filtrar por categoría
    <select :value="modelValue ?? ''" @change="onChange">
      <option value="">Todas las categorías</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nombre }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.tarea-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

select {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
}
</style>
