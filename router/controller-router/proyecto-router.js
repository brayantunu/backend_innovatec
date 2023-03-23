import  {Router} from "express";
import { create_proyecto, delete_proyecto, get_proyecto, get_proyecto_id, update_proyecto } from "../../controller/models-controller/proyecto-controller/proyecto_controller.js";
const router = Router()

router.get('/proyecto',get_proyecto)
router.post('/proyecto',create_proyecto)
router.patch('/proyecto/:id',update_proyecto)
router.delete('/proyecto/:id',delete_proyecto)
router.get('/proyecto/:id',get_proyecto_id)

export default router




