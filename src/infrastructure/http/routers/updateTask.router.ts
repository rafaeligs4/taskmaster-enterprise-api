import { Router } from "express";
import { UpdateTaskController } from "../controllers/updateTask.controller";
import { updateTaskCont } from "../../dependencies";

export const router = Router();

router.put("/update/:id", updateTaskCont.updateTask);
