import { Router } from "express";
import { loginUserCont } from "../../dependencies";

export const router = Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión con un usuario existente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post('/', loginUserCont.login.bind(loginUserCont.login));
