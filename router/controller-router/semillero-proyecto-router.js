import  {Router} from "express";
import{get_semillero_proyecto,create_semillero_proyecto,update_semillero_proyecto,delete_semillero_proyecto,get_semillero_proyecto_id} from "../../controller/models-controller/semillero-proyecto/semillero-proyecto-controller.js";
const router = Router()

router.get('/semilleros_proyecto',get_semillero_proyecto)
router.post('/semilleros_proyecto',create_semillero_proyecto)
router.patch('/semilleros_proyecto/:id',update_semillero_proyecto)
router.delete('/semilleros_proyecto/:id',delete_semillero_proyecto)
router.get('/semilleros_proyecto/:id',get_semillero_proyecto_id)

export default router
