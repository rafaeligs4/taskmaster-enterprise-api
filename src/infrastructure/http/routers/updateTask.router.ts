import { RequestHandler, Router } from "express";
import { UpdateTaskController } from "../controllers/updateTask.controller";
import { authMiddleware, updateTaskCont } from "../../dependencies";

export const router = Router();

router.put("/update/:id", authMiddleware.handle as unknown as RequestHandler, updateTaskCont.updateTask as unknown as RequestHandler);
