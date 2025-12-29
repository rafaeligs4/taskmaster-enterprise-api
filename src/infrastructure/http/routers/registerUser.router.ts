import { Router } from "express";
import { registerUserCont } from "../../dependencies";

export const router = Router();

router.post('/', registerUserCont.registerUser.bind(registerUserCont));

