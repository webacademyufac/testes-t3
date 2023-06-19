import { Router } from "express";
import ColecaoController from "../controllers/ColecaoController";
import CitacaoController from "../controllers/CitacaoController";

const routers = Router()

routers.use(ColecaoController.routes)
routers.use(CitacaoController.routes)

export default routers