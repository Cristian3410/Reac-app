import { Router } from "express";
import { register } from "../controllers/Credenciales.js";
import{ login } from "../controllers/Credenciales.js"
import {getsSchedule} from "../controllers/Tareas.js"

const router = Router();


router.post('/register',register)
router.post('/login',login)
router.get('/Schedule',getsSchedule)

export default router