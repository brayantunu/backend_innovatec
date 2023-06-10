import { Router } from "express";
// importamos la libreria de express llamamos un objeto router para hacer la conexcion de frontend con el backend 
import {getproducto, get_producto_id, create_producto, delete_producto, update_producto,searchProducts, filtrosemilleros, subtipoproducto, filtroaño, filtroproyecto, filtroprograma,get_funcionario_identificacion, uploadImage } from "../../controller/producto-controller/producto-controller.js";
import cors from "cors"
import multer from "multer";
import path from "path"

// se importa cors esto permite que los clientes pueda consumir los datos
const router = Router()

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// router.get('/producto/buscar',cors(),searchProducts)
router.get('/producto/buscar', cors(), searchProducts)
router.get('/', cors(), getproducto)
router.get('/producto/:producto_id', cors(), get_producto_id)
router.post('/producto',cors(),upload.single('producto_imagen'),  create_producto)
router.delete('/producto/:producto_id', delete_producto)
router.patch('/producto/:producto_id', update_producto)
router.get('/filtrosemillero', cors(), filtrosemilleros)//LISTO

router.get('/filtroproducto', cors(), subtipoproducto)
router.get('/filtroano', cors(), filtroaño)
router.get('/filtroproyecto', cors(), filtroproyecto)
router.get('/filtroprograma', cors(), filtroprograma)

router.get('/productos/:funcionario_iden',get_funcionario_identificacion)

router.post('/upload',cors(), upload.single('image'), uploadImage);

//  http://localhost:3000/filtroProducto?productos_autores=erreca
// router.get('/excel', cors(), upload)
export default router
  