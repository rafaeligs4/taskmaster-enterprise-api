import { Router } from "express";
import { RequestHandler } from "express";
import { authMiddleware, createTController } from "../../dependencies";
import { validate } from "../middlewares/ValidationMiddleware";
import { CreateTaskSchema } from "../schemas/TaskSchemas";

export const router = Router();

// Bind para mantener contexto y evitar lost-this
/**
 * @swagger
 * /task/createTask:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post(
    '/createTask',
    authMiddleware.handle as unknown as RequestHandler,
    validate(CreateTaskSchema),
    createTController.createTask as unknown as RequestHandler
);
