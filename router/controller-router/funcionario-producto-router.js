import  {Router} from "express";
import {get_funcionario_producto, create_funcionario_producto,update_funcionario_producto, delete_funcionario_producto, get_funcionario_producto_id} from "../../controller/models-controller/funcionario-producto-controller/funcionario-producto-controller.js";

const router = Router()

router.get('/funcionario_producto',get_funcionario_producto)
router.post('/funcionario_producto',create_funcionario_producto)
router.patch('/funcionario_producto/:id',update_funcionario_producto)
router.delete('/funcionario_producto/:id',delete_funcionario_producto)
router.get('/funcionario_producto/:id',get_funcionario_producto_id)

export default router

