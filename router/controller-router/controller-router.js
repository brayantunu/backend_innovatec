import  {Router} from "express";
import { CREATEPRODUCTO, DELETEPRODUCTO, GETPRODUCTO, UPDATEPRODUCTO } from "../../controller/models-controller/producto-controller/producto-controller.js";
import { createpuntaje, deletepuntaje, getpuntaje, updatepuntaje } from "../../controller/models-controller/puntaje-controller/puntaje-controller.js";
import {getfuncionario,getfuncionarioid,createfuncionario,updatefuncionario,deletefuncionario} from   "../../controller/models-controller/funcionario-controller/funcionario-controller.js";
import { CREATE_FUNCIONARIO_PRODUCTO, DELETE_FUNCIONARIO_PRODUCTO, GET_FUNCIONARIO_PRODUCTO, GET_FUNCIONARIO_PRODUCTO_ID, UPDATE_FUNCIONARIO_PRODUCTO } from "../../controller/models-controller/funcionario-producto-controller/funcionario-producto-controller.js";
import { CREATE_SEMILLERO, DELETE_SEMILLERO, GET_SEMILLERO, GET_SEMILLERO_ID, UPDATE_SEMILLERO } from "../../controller/models-controller/semillero-controller/semillero-controller.js";
const router = Router()

// ROUTER THE PUNTAJES
router.get('/puntaje',getpuntaje)
router.post('/puntaje',createpuntaje)
router.put('/puntaje',updatepuntaje)
router.delete('/puntaje',deletepuntaje)

// ROUTER THE PRODUCTO
router.get('/producto',GETPRODUCTO)
router.post('/producto',CREATEPRODUCTO)
router.delete('/producto/:PRODUCTO_ID',DELETEPRODUCTO)
router.put('/producto/:PRODUCTO_ID',UPDATEPRODUCTO)

//ROUTER THE FUNCIONARIO

router.get('/funcionario',getfuncionario)
router.get('/funcionario/:id',getfuncionarioid)
router.post('/funcionario',createfuncionario)
router.put('/funcionario/:funcionario_id',updatefuncionario)
router.delete('/funcionario/:funcionario_id',deletefuncionario)


// ROUTER THE FUNCIONARIO AND PRODUCTO
router.get('/FUNCIONARIO_PRODUCTO',GET_FUNCIONARIO_PRODUCTO)
router.post('/FUNCIONARIO_PRODUCTO',CREATE_FUNCIONARIO_PRODUCTO)
router.put('/FUNCIONARIO_PRODUCTO/:id',UPDATE_FUNCIONARIO_PRODUCTO)
router.delete('/FUNCIONARIO_PRODUCTO/:id',DELETE_FUNCIONARIO_PRODUCTO)
router.get('/FUNCIONARIO_PRODUCTO/:id',GET_FUNCIONARIO_PRODUCTO_ID)

// ROUTER THE SEMILLEROS

router.get('/SEMILLEROS',GET_SEMILLERO)
router.post('/SEMILLEROS',CREATE_SEMILLERO)
router.put('/SEMILLEROS/:id',UPDATE_SEMILLERO)
router.delete('/SEMILLEROS/:id',DELETE_SEMILLERO)
router.get('/SEMILLEROS/:id',GET_SEMILLERO_ID)

export default router