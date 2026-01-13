import { Router } from "express";
import { refreshTokenCont } from "../../dependencies";

export const router = Router();

router.post('/refresh', refreshTokenCont.run);