import  {Router} from "express";
import { get_funcionario_proyecto } from "../../controller/funcionario-proyecto-controller/funcionario-proyecto-controller.js";
const router = Router()
router.get('/funcionarioproyecto',get_funcionario_proyecto)
export default router
