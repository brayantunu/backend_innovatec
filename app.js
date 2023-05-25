import Express from "express";
// express es una libreria para desarrollo de aplicaciones web para el programadores de nodejs

import bodyParser from "body-parser";
import funcionario from  "./src/router/controller-router/funcionario-router.js"
import funcionario_producto from "./src/router/controller-router/funcionario-producto-router.js"
import funcionario_semillero from "./src/router/controller-router/funcionario-semillero-router.js"
import producto from "./src/router/controller-router/producto-router.js"
import proyecto from "./src/router/controller-router/proyecto-router.js"
import puntaje from "./src/router/controller-router/puntaje-router.js"
import producto_proyecto from "./src/router/controller-router/producto-proyecto-router.js"
import semillero from "./src/router/controller-router/semillero-router.js"
import semillero_producto from "./src/router/controller-router/semillero-producto-router.js"
import semillero_proyecto from "./src/router/controller-router/semillero-proyecto-router.js"
import funcionarioproyecto from "./src/router/controller-router/funcionario-proyecto-router.js"
import programas from "./src/router/controller-router/programa-router.js"
import cookieParser from "cookie-parser"
// import funcionario from  "./router/controller-router/funcionario-router.js"
// import funcionario_producto from "./router/controller-router/funcionario-producto-router.js"
// import funcionario_semillero from "./router/controller-router/funcionario-semillero-router.js"
// import producto from "./router/controller-router/producto-router.js"
// import proyecto from "./router/controller-router/proyecto-router.js"
// import puntaje from "./router/controller-router/puntaje-router.js"
// import producto_proyecto from "./router/controller-router/producto-proyecto-router.js"
// import semillero from "./router/controller-router/semillero-router.js"
// import semillero_producto from "./router/controller-router/semillero-producto-router.js"
// import semillero_proyecto from "./router/controller-router/semillero-proyecto-router.js"
// // import nivel from "./router/controller-router/calculadora-router.js"
// import funcionarioproyecto from "./router/controller-router/funcionario-proyecto-router.js"

// la importacion de los router es para traer todas las api que se crean en los servicios de cada estructura para que el cliente consuma los servicios

const app = Express()


app.use(Express.json())
app.use(programas,funcionario,funcionario_producto,funcionario_semillero,producto,proyecto,puntaje,semillero,producto_proyecto,semillero_producto,semillero_proyecto,funcionarioproyecto)

//el app.use une todos los servicios para poder ser inicializados en servicios clientes

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use (cookieParser())



export default app;
