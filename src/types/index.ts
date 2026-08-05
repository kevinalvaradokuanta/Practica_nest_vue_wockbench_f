export interface Usuario {
  id: number
  email: string
}

export interface RegisterResponse {
  id: number
  nombre: string
  email: string
  creadoEn: string
}

export interface LoginResponse {
  accessToken: string
}

export interface Categoria {
  id: number
  nombre: string
  usuarioId: number
  creadoEn: string
}

export type EstadoTarea = 'pendiente' | 'completada'

export interface Tarea {
  id: number
  titulo: string
  descripcion: string
  estado: EstadoTarea
  fechaLimite: string
  usuarioId: number
  categoriaId: number
  creadoEn: string
  categoria?: Categoria
}

export interface CreateTareaPayload {
  titulo: string
  descripcion: string
  estado: EstadoTarea
  fechaLimite: string
  categoriaId: number
}

export type UpdateTareaPayload = Partial<CreateTareaPayload>
