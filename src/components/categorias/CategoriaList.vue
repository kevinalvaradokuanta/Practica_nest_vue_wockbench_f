<script setup lang="ts">
import type { Categoria } from '../../types'

defineProps<{
  categorias: Categoria[]
  loading: boolean
}>()

const emit = defineEmits<{
  edit: [categoria: Categoria]
  delete: [categoria: Categoria]
}>()
</script>

<template>
  <ul v-if="categorias.length" class="categoria-list">
    <li v-for="categoria in categorias" :key="categoria.id" class="categoria-item">
      <span>{{ categoria.nombre }}</span>
      <div class="categoria-item-actions">
        <button type="button" :disabled="loading" @click="emit('edit', categoria)">Editar</button>
        <button type="button" class="danger" :disabled="loading" @click="emit('delete', categoria)">
          Eliminar
        </button>
      </div>
    </li>
  </ul>
  <p v-else class="empty-state">No hay categorías todavía.</p>
</template>

<style scoped>
.categoria-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.categoria-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.categoria-item-actions {
  display: flex;
  gap: 8px;
}

.categoria-item-actions button {
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: none;
  color: var(--text);
  font-size: 13px;
}

.categoria-item-actions button.danger {
  color: var(--danger);
  border-color: var(--danger);
}

.categoria-item-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  color: var(--text-muted);
}
</style>
