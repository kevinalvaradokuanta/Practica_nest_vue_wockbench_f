<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

function onLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-links">
      <RouterLink to="/tareas">Tareas</RouterLink>
      <RouterLink to="/categorias">Categorías</RouterLink>
    </div>
    <div v-if="authStore.isAuthenticated" class="navbar-user">
      <span>{{ authStore.usuario?.email }}</span>
      <button type="button" @click="onLogout">Cerrar sesión</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border);
}

.navbar-links {
  display: flex;
  gap: 16px;
}

.navbar-links a {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
}

.navbar-links a.router-link-active {
  color: var(--accent);
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar-user button {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 12px;
  color: var(--text);
}
</style>
