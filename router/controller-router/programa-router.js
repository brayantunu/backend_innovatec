import  {Router} from "express";
import { create_programa, delete_programa, get_programa_id, programa, update_programa } from "../../controller/programa-controller/programa-controller.js";
const router = Router()

router.get("/programa",programa)
router.post("/programa",create_programa)
router.put("/programa",update_programa)
router.delete("/programa",delete_programa)
router.get("/programa/:programa_id",get_programa_id)

export default router
