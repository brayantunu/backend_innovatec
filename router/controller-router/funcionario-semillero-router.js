import  {Router} from "express";
import {get_funcionario_semillero,create_funcionario_semillero,update_funcionario_semillero,delete_funcionario_semillero,get_funcionario_semillero_id} from "../../controller/models-controller/funcionario-semillero/funcionario-semillero.js"
const router = Router()
router.get('/funcionario_semilleros',get_funcionario_semillero)
router.post('/funcionario_semilleros',create_funcionario_semillero)
router.patch('/funcionario_semilleros/:id',update_funcionario_semillero)
router.delete('/funcionario_semilleros/:id',delete_funcionario_semillero)
router.get('/funcionario_semilleros/:id',get_funcionario_semillero_id)




export default router
