import  {Router} from "express";
import { getproducto,get_producto_id,create_producto, delete_producto, update_producto } from "../../controller/models-controller/producto-controller/producto-controller.js";

const router = Router()

router.get('/producto',getproducto)
router.get ('/producto',get_producto_id)
router.post('/producto',create_producto)
router.delete('/producto/:producto_id',delete_producto)
router.patch('/producto/:producto_id',update_producto)

export default router
