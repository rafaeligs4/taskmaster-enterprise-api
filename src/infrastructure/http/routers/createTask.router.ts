import { Router } from "express";
import { RequestHandler } from "express";
import { authMiddleware, createTController } from "../../dependencies";
import { validate } from "../middlewares/ValidationMiddleware";
import { CreateTaskSchema } from "../schemas/TaskSchemas";

export const router = Router();

// Bind para mantener contexto y evitar lost-this
router.post(
    '/createTask',
    authMiddleware.handle as unknown as RequestHandler,
    validate(CreateTaskSchema),
    createTController.createTask as unknown as RequestHandler
);
