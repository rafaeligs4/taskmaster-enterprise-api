import { z } from 'zod';

// Esquema para Crear Tarea
export const CreateTaskSchema = z.object({
    body: z.object({
        title: z.string({
            error: "Title is required"
        }).min(3, "Title must be at least 3 chars long"),

        description: z.string().min(5, "Description is too short").optional(),
    })
});

// Esquema para Actualizar Status (ejemplo)
export const UpdateTaskStatusSchema = z.object({
    body: z.object({
        status: z.number().min(0).max(1) // Solo 0 o 1
    }),
    params: z.object({
        id: z.string().min(1)
    })
});