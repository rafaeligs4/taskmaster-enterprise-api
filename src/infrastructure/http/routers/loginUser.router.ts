import { Router } from "express";
import { loginUserCont } from "../../dependencies";

export const router = Router();

router.post('/login', loginUserCont.login.bind(loginUserCont.login));
