<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const touched = ref(false)

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const formValid = computed(() => emailValid.value && password.value.length > 0)

async function onSubmit() {
  touched.value = true
  if (!formValid.value) return

  try {
    await authStore.login(email.value, password.value)
    router.push('/tareas')
  } catch {
    // authStore.error ya contiene el mensaje para el usuario
  }
}
</script>

<template>
  <div class="auth-view">
    <h1>Iniciar sesión</h1>
    <form novalidate @submit.prevent="onSubmit">
      <label>
        Email
        <input v-model="email" type="email" autocomplete="email" />
        <span v-if="touched && !emailValid" class="field-error">Ingresa un email válido.</span>
      </label>

      <label>
        Contraseña
        <input v-model="password" type="password" autocomplete="current-password" />
        <span v-if="touched && password.length === 0" class="field-error">La contraseña es requerida.</span>
      </label>

      <p v-if="authStore.error" class="form-error">{{ authStore.error }}</p>

      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Ingresando…' : 'Ingresar' }}
      </button>
    </form>

    <p class="auth-switch">
      ¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.auth-view {
  max-width: 360px;
  margin: 40px auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: var(--text-muted);
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

.form-error {
  color: var(--danger);
  margin: 0;
}

button[type='submit'] {
  padding: 10px;
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

.auth-switch {
  margin-top: 16px;
  font-size: 14px;
}
</style>
