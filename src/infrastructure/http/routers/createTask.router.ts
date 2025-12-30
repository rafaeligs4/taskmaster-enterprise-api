import { Router } from "express";
import { authMiddleware, createTController } from "../../dependencies";

export const router = Router();

// Bind para mantener contexto y evitar lost-this
router.post('/createTask', authMiddleware.handle, createTController.createTask.bind(createTController));