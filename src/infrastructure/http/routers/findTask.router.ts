import { Router } from "express";
import { findByIdController } from "../../dependencies";


export const router = Router();

router.get('/findById/:id',findByIdController.findTask.bind(findByIdController));