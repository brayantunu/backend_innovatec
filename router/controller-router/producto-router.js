import  {Router} from "express";
import { getproducto,get_producto_id,create_producto, delete_producto, update_producto, searchProducts, filtroProducto, filesexcel } from "../../controller/models-controller/producto-controller/producto-controller.js";
import cors from "cors"
const router = Router()
router.get('/buscar',cors(),searchProducts)
router.get('/producto',cors(),getproducto)
router.get ('/producto/:producto_id',cors(),get_producto_id)
router.post('/producto',create_producto)
router.delete('/producto/:producto_id',delete_producto)
router.patch('/producto/:producto_id',update_producto)
router.get('/productos/:productos_autor', cors(),filtroProducto)
router.post('/datos',filesexcel)


export default router
