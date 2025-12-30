import { Router } from "express";
import { authMiddleware, findByIdController } from "../../dependencies";


export const router = Router();

router.get('/findById/:id', authMiddleware.handle, findByIdController.findTask.bind(findByIdController));