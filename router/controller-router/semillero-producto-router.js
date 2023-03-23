import  {Router} from "express";
import {get_semillero_producto,create_semillero_producto,update_semillero_producto,delete_semillero_producto,get_semillero_producto_id} from "../../controller/models-controller/semillero-producto/semillero-producto.js"

const router = Router()

router.get('/semilleros_producto',get_semillero_producto)
router.post('/semilleros_producto',create_semillero_producto)
router.patch('/semilleros_producto/:id',update_semillero_producto)
router.delete('/semilleros_producto/:id',delete_semillero_producto)
router.get('/semilleros_producto/:id',get_semillero_producto_id)

export default router
