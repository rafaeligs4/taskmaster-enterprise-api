import { Router } from "express";
import { createTController } from "../../dependencies";

export const router = Router();

// Bind para mantener contexto y evitar lost-this
router.post('/createTask', createTController.createTask.bind(createTController));