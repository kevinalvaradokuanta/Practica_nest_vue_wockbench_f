# Gestor de Tareas Personales — Frontend

Frontend en Vue 3 (Composition API + `<script setup>`), Vue Router y Pinia para el Gestor de Tareas Personales, consumiendo el backend NestJS ya construido.

## Requisitos

- Node.js 20+
- El backend NestJS corriendo (por defecto se espera en `http://localhost:3000`)

## Instalación

```bash
npm install
```

Copia el archivo de variables de entorno y ajusta la URL del backend si hace falta:

```bash
cp .env.example .env
```

`VITE_API_URL` debe apuntar a la URL base del backend NestJS.

## Desarrollo

```bash
npm run dev
```

## Otros comandos

```bash
npm run type-check   # Verifica tipos con vue-tsc, sin emitir archivos
npm run build         # Type-check + build de producción
npm run preview       # Sirve el build de producción localmente
```

## Notas sobre el contrato con el backend

El backend expone sus DTOs y respuestas en **camelCase** (`accessToken`, `fechaLimite`, `categoriaId`, `usuarioId`, `creadoEn`), con una excepción: el filtro por categoría en `GET /tareas` usa el query param `categoria_id` (snake_case). El registro (`POST /auth/register`) no inicia sesión automáticamente ni devuelve token — hay que iniciar sesión por separado después de registrarse. Ver [.claude/skills/vue-team-conventions/SKILL.md](.claude/skills/vue-team-conventions/SKILL.md) para el detalle completo.
