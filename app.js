import Express from "express";
import indexrouter from "./router/index-router/index-router.js"
import  getpuntaje  from "./router/controller-router/controller-router.js";

const app = Express()
app.use(Express.json())
app.use(indexrouter)
app.use(getpuntaje)
export default app;
