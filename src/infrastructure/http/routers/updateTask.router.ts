import { RequestHandler, Router } from "express";
import { UpdateTaskController } from "../controllers/updateTask.controller";
import { authMiddleware, updateTaskCont } from "../../dependencies";

export const router = Router();

/**
 * @swagger
 * /task/update/{id}:
 *   put:
 *     summary: Actualiza el estado de una tarea (Hardcoded a status 1)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       201:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/update/:id", authMiddleware.handle as unknown as RequestHandler, updateTaskCont.updateTask as unknown as RequestHandler);
