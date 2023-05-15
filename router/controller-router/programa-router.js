import  {Router} from "express";
import { programa } from "../../controller/programa-controller/programa-controller.js";
const router = Router()

router.get("/programa",programa)

export default router
