import Express from "express";
import bodyParser from "body-parser";
import indexrouter from "./router/index-router/index-router.js"
import  controolerrouter  from "./router/controller-router/controller-router.js";

const app = Express()
app.use(Express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(indexrouter)
app.use(controolerrouter)
export default app;
