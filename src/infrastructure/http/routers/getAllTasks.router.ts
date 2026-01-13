import { RequestHandler, Router } from "express";
import { authMiddleware, getAllCont } from "../../dependencies";


export const router = Router();

/**
 * @swagger
 * /task/getAll:
 *   get:
 *     summary: Obtiene todas las tareas del usuario autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas recuperada exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', authMiddleware.handle as unknown as RequestHandler, getAllCont.getAllTask as unknown as RequestHandler)
