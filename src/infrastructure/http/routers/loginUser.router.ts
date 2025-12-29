import { Router } from "express";
import { loginUserCont } from "../../dependencies";

export const router = Router();

router.post('/', loginUserCont.login.bind(loginUserCont.login));
