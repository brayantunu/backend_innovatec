import  {Router} from "express";
import { CREATEPRODUCTO, DELETEPRODUCTO, GETPRODUCTO, UPDATEPRODUCTO } from "../../controller/models-controller/producto-controller/producto-controller.js";
import { createpuntaje, deletepuntaje, getpuntaje, updatepuntaje } from "../../controller/models-controller/puntaje-controller/puntaje-controller.js";
const router = Router()

// ROUTER THE PUNTAJES
router.get('/puntaje',getpuntaje)
router.post('/puntaje',createpuntaje)
router.put('/puntaje',updatepuntaje)
router.delete('/puntaje',deletepuntaje)

// ROUTER THE PRODUCTO
router.get('/producto',GETPRODUCTO)
router.post('/producto',CREATEPRODUCTO)
router.delete('/producto/:PRODUCTO_ID',UPDATEPRODUCTO)
router.put('/producto/:PRODUCTO_ID',DELETEPRODUCTO)




export default router