import  {Router} from "express";
import { getproducto,get_producto_id,create_producto, delete_producto, update_producto, searchProducts,upload, searchProducts1, filtrosemilleros, tipoproducto } from "../../controller/producto-controller/producto-controller.js";
import cors from "cors"

const router = Router()
router.get('/producto/buscar',cors(),searchProducts)
router.get('/producto/buscar1',cors(),searchProducts1)

router.get('/producto',cors(),getproducto)
router.get ('/producto/:producto_id',cors(),get_producto_id)
router.post('/producto',cors(),create_producto)
router.delete('/producto/:producto_id',delete_producto)
router.patch('/producto/:producto_id',update_producto)
router.get('/filtrosemillero', cors(),filtrosemilleros) 
router.get('/filtroproducto',cors(),tipoproducto)
//  http://localhost:3000/filtroProducto?productos_autores=erreca
router.get('/excel', cors(),upload)


export default router
