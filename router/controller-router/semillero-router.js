import  {Router} from "express";
import { create_semillero, delete_semillero, get_semillero, get_semillero_id, update_semillero } from "../../controller/models-controller/semillero-controller/semillero-controller.js";
const router = Router()

router.get('/semilleros',get_semillero)
router.post('/semilleros',create_semillero)
router.patch('/semilleros/:id',update_semillero)
router.delete('/semilleros/:id',delete_semillero)
router.get('/semilleros/:id',get_semillero_id)
export default router
