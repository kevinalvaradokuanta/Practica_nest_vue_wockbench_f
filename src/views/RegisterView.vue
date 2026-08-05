<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const nombre = ref('')
const email = ref('')
const password = ref('')
const touched = ref(false)
const success = ref(false)

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const formValid = computed(
  () => nombre.value.trim().length > 0 && emailValid.value && password.value.length >= 6,
)

async function onSubmit() {
  touched.value = true
  if (!formValid.value) return

  try {
    await authStore.register(nombre.value, email.value, password.value)
    success.value = true
    setTimeout(() => router.push('/login'), 1000)
  } catch {
    // authStore.error ya contiene el mensaje para el usuario
  }
}
</script>

<template>
  <div class="auth-view">
    <h1>Crear cuenta</h1>

    <p v-if="success" class="form-success">Cuenta creada. Redirigiendo a inicio de sesión…</p>

    <form v-else novalidate @submit.prevent="onSubmit">
      <label>
        Nombre
        <input v-model="nombre" type="text" autocomplete="name" />
        <span v-if="touched && nombre.trim().length === 0" class="field-error">El nombre es requerido.</span>
      </label>

      <label>
        Email
        <input v-model="email" type="email" autocomplete="email" />
        <span v-if="touched && !emailValid" class="field-error">Ingresa un email válido.</span>
      </label>

      <label>
        Contraseña
        <input v-model="password" type="password" autocomplete="new-password" />
        <span v-if="touched && password.length < 6" class="field-error">Mínimo 6 caracteres.</span>
      </label>

      <p v-if="authStore.error" class="form-error">{{ authStore.error }}</p>

      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Creando cuenta…' : 'Registrarme' }}
      </button>
    </form>

    <p class="auth-switch">
      ¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink>
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

.form-success {
  color: var(--success);
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
