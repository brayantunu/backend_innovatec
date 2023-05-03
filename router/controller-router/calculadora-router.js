import { Router } from "express";
import { getnivel } from "../../controller/calculadora-controller/nivel-relativo-controller.js";
import { getsolucion } from "../../controller/calculadora-controller/posible-solucion-controller.js";
import { getpregunta } from "../../controller/calculadora-controller/pregunta-analisis-controller.js";
import { getresultado } from "../../controller/calculadora-controller/solucion-controller.js";
const router = Router()
router.get('/nivel',getnivel)



router.get('/solucion',getsolucion)





router.get('/pregunta',getpregunta)



router.get('/resultado',getresultado)
export default router;