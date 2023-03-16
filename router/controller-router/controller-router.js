import  {Router} from "express";
import { getpuntaje } from "../../controller/models-controller/puntaje-controller/puntaje-controller.js";
const router = Router()
router.get('/puntaje',getpuntaje)
export default router