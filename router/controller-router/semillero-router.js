import  {Router} from "express";
import { create_semillero, delete_semillero, get_semillero, get_semillero_id, update_semillero } from "../../controller/semillero-controller/semillero-controller.js";
const router = Router()

router.get('/semilleros',get_semillero)
router.post('/semilleros',create_semillero)
router.patch('/semilleros/semillero_id',update_semillero)
router.delete('/semilleros/:semillero_id',delete_semillero)
router.get('/semilleros/:semillero_id',get_semillero_id)
export default router
