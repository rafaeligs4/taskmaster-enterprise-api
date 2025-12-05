import { Router } from "express";
import { getAllCont } from "../../dependencies";


export const router = Router();

router.get('/',getAllCont.getAllTask.bind(getAllCont))