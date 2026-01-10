import { RequestHandler, Router } from "express";
import { authMiddleware, findByIdController } from "../../dependencies";


export const router = Router();

/**
 * @swagger
 * /task/findById/{id}:
 *   get:
 *     summary: Busca una tarea por su ID
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
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/findById/:id', authMiddleware.handle as unknown as RequestHandler, findByIdController.findTask as unknown as RequestHandler);