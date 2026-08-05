<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'

const route = useRoute()
</script>

<template>
  <NavBar v-if="route.meta.requiresAuth" />
  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
.app-main {
  flex: 1;
  padding: 24px;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
