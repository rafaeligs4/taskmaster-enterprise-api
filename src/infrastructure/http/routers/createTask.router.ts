import { Router } from "express";
import { RequestHandler } from "express";
import { authMiddleware, createTController } from "../../dependencies";

export const router = Router();

// Bind para mantener contexto y evitar lost-this
router.post(
    '/createTask',
    authMiddleware.handle as unknown as RequestHandler,
    createTController.createTask as unknown as RequestHandler
);
