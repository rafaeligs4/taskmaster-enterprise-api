import { Router } from "express";
import { createTController } from "../../dependencies";


export const router = Router();
router.post('/createTask',createTController.createTask);