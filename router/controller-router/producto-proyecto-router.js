import  {Router} from "express";
import { get_producto_proyecto,create_producto_proyecto,update_producto_proyecto, delete_producto_proyecto,  get_producto_proyecto_id,  } from "../../controller/models-controller/producto_proyecto_controller/producto-proyecto-controller.js";
const router = Router()
router.get('/producto_proyecto',get_producto_proyecto)
router.post('/producto_proyecto',create_producto_proyecto)
router.patch('/producto_proyecto',update_producto_proyecto)
router.delete('/producto_proyecto',delete_producto_proyecto)
router.get('/producto_proyecto',get_producto_proyecto_id)

export default router
