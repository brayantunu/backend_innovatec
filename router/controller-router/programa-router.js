import  {Router} from "express";
import { createprograma, programa } from "../../controller/programa-controller/programa-controller.js";
const router = Router()

router.get("/programa",programa)
router.post("/programa",createprograma)

export default router
