import { Router } from "express";
import { registerUserCont } from "../../dependencies";

export const router = Router();

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en los datos o usuario ya existe
 *       500:
 *         description: Error del servidor
 */
router.post('/', registerUserCont.registerUser.bind(registerUserCont));

