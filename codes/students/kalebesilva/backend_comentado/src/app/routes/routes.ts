import { Router } from "express";
import ColecaoController from "../controllers/ColecaoController";
import CitacaoController from "../controllers/CitacaoController";

const routers = Router() // Cria variável de rotas

// informa quais rotas serao utilizadas na api
routers.use(ColecaoController.routes) // usa a roda de colecao cotroller
routers.use(CitacaoController.routes) // usa a rota de citacao controller

export default routers //exporta para ser usada em outros lugares da aplicacao