import  {Router} from "express";
import { getproducto,get_producto_id,create_producto, delete_producto, update_producto, searchProducts, filtroProducto,upload } from "../../controller/models-controller/producto-controller/producto-controller.js";
import cors from "cors"

const router = Router()
router.get('/producto/buscar',cors(),searchProducts)
router.get('/producto',cors(),getproducto)
router.get ('/producto/:producto_id',cors(),get_producto_id)
router.post('/producto',create_producto)
router.delete('/producto/:producto_id',delete_producto)
router.patch('/producto/:producto_id',update_producto)
router.get('/producto/:productos_autor', cors(),filtroProducto)
router.get('/excel', cors(),upload)


export default router
