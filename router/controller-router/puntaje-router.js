import  {Router} from "express";
import { create_puntaje, delete_puntaje, get_puntaje, update_puntaje } from "../../controller/models-controller/puntaje-controller/puntaje-controller.js";

const router = Router()

router.get('/puntaje',get_puntaje)
router.post('/puntaje',create_puntaje)
router.patch('/puntaje',update_puntaje)
router.delete('/puntaje',delete_puntaje)

export default router
