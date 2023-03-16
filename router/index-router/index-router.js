import  {Router} from "express";
import { getindex } from "../../controller/index-controller/index-controller.js";
const router = Router()
router.get('/index',getindex)
export default router