import { RequestHandler, Router } from "express";
import { authMiddleware, getAllCont } from "../../dependencies";


export const router = Router();

router.get('/', authMiddleware.handle as unknown as RequestHandler, getAllCont.getAllTask as unknown as RequestHandler)
