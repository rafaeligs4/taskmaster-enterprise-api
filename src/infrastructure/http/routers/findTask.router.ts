import { RequestHandler, Router } from "express";
import { authMiddleware, findByIdController } from "../../dependencies";


export const router = Router();

router.get('/findById/:id', authMiddleware.handle as unknown as RequestHandler, findByIdController.findTask as unknown as RequestHandler);