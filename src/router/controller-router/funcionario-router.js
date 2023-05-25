import  {Router} from "express";
import {get_funcionario,get_funcionario_id,create_funcionario,update_funcionario_id,delete_funcionario_id,login} from   "../../controller/funcionario-controller/funcionario-controller.js"

const router = Router()

router.get('/funcionario',get_funcionario)
router.get('/funcionario/:funcionario_id',get_funcionario_id)
router.post('/funcionario',create_funcionario)
router.post('/login',login)
router.patch('/funcionario/:funcionario_id',update_funcionario_id)
router.delete('/funcionario/:funcionario_id',delete_funcionario_id)
export default router

