import  {Router} from "express";
import { createpuntaje, deletepuntaje, getpuntaje, updatepuntaje } from "../../controller/models-controller/puntaje-controller/puntaje-controller.js";
const router = Router()
router.get('/puntaje',getpuntaje)
router.post('/puntaje',createpuntaje)
router.put('/puntaje',updatepuntaje)
router.delete('/puntaje',deletepuntaje)
export default router