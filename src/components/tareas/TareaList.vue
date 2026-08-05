<script setup lang="ts">
import type { Tarea } from '../../types'

defineProps<{
  tareas: Tarea[]
  loading: boolean
}>()

const emit = defineEmits<{
  edit: [tarea: Tarea]
  delete: [tarea: Tarea]
  toggleEstado: [tarea: Tarea]
}>()

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString()
}
</script>

<template>
  <ul v-if="tareas.length" class="tarea-list">
    <li
      v-for="tarea in tareas"
      :key="tarea.id"
      class="tarea-item"
      :class="{ 'tarea-item--completada': tarea.estado === 'completada' }"
    >
      <div class="tarea-info">
        <div class="tarea-titulo-row">
          <strong>{{ tarea.titulo }}</strong>
          <span class="tarea-estado" :class="`tarea-estado--${tarea.estado}`">
            {{ tarea.estado === 'completada' ? 'Completada' : 'Pendiente' }}
          </span>
        </div>
        <p v-if="tarea.descripcion" class="tarea-descripcion">{{ tarea.descripcion }}</p>
        <div class="tarea-meta">
          <span>{{ tarea.categoria?.nombre ?? 'Sin categoría' }}</span>
          <span>Vence: {{ formatFecha(tarea.fechaLimite) }}</span>
        </div>
      </div>
      <div class="tarea-actions">
        <button type="button" :disabled="loading" @click="emit('toggleEstado', tarea)">
          {{ tarea.estado === 'completada' ? 'Marcar pendiente' : 'Marcar completada' }}
        </button>
        <button type="button" :disabled="loading" @click="emit('edit', tarea)">Editar</button>
        <button type="button" class="danger" :disabled="loading" @click="emit('delete', tarea)">
          Eliminar
        </button>
      </div>
    </li>
  </ul>
  <p v-else class="empty-state">No hay tareas todavía.</p>
</template>

<style scoped>
.tarea-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tarea-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.tarea-item--completada {
  opacity: 0.65;
}

.tarea-item--completada .tarea-titulo-row strong {
  text-decoration: line-through;
}

.tarea-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.tarea-titulo-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tarea-estado {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.tarea-estado--pendiente {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
}

.tarea-estado--completada {
  background: color-mix(in srgb, var(--success) 15%, transparent);
  color: var(--success);
}

.tarea-descripcion {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}

.tarea-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--text-muted);
}

.tarea-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
}

.tarea-actions button {
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: none;
  color: var(--text);
  font-size: 13px;
  white-space: nowrap;
}

.tarea-actions button.danger {
  color: var(--danger);
  border-color: var(--danger);
}

.tarea-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  color: var(--text-muted);
}
</style>
