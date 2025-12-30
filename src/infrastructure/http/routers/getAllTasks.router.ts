import { Router } from "express";
import { authMiddleware, getAllCont } from "../../dependencies";


export const router = Router();

router.get('/', authMiddleware.handle, getAllCont.getAllTask.bind(getAllCont))