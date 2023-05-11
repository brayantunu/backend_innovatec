import  {Router} from "express";
import { programa,create_programa } from "../../controller/programa-controller/programa-controller.js";
const router = Router()

router.get("/programa",programa)
router.post("/programa",create_programa)

export default router
