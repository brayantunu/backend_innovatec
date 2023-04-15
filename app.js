import Express from "express";
import bodyParser from "body-parser";
import funcionario from  "./router/controller-router/funcionario-router.js"
import funcionario_producto from "./router/controller-router/funcionario-producto-router.js"
import funcionario_semillero from "./router/controller-router/funcionario-semillero-router.js"
import producto from "./router/controller-router/producto-router.js"
import proyecto from "./router/controller-router/proyecto-router.js"
import puntaje from "./router/controller-router/puntaje-router.js"
import producto_proyecto from "./router/controller-router/producto-proyecto-router.js"
import semillero from "./router/controller-router/semillero-router.js"
import semillero_producto from "./router/controller-router/semillero-producto-router.js"
import semillero_proyecto from "./router/controller-router/semillero-proyecto-router.js"
const app = Express()
app.use(Express.json())
app.use(funcionario,funcionario_producto,funcionario_semillero,producto,proyecto,puntaje,semillero,producto_proyecto,semillero_producto,semillero_proyecto)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


export default app;
