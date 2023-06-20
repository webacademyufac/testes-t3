import { Request, Response, Router } from 'express';
import ColecaoService from '../services/ColecaoService';
import ColecaoInterface from '../interfaces/entities/ColecaoInterface';
import {
  CreateColecaoValidator,
  GetColecaoValidator,
  UpdateColecaoValidator,
} from '../validators/ColecaoValidator';
import errorHandler from '../Errors/ErrorHandle';
import ColecaoServiceInterface from '../interfaces/services/ColecaoServiceInterface';
import ColecaoRepository from '../repositories/ColecaoRepository';
import { validationResult } from 'express-validator';

class ColecaoController {
  public routes = Router();
  private colecaoService: ColecaoServiceInterface;

  constructor() {
    this.colecaoService = new ColecaoService(ColecaoRepository);

    this.routes.get('/colecao', GetColecaoValidator, this.findAll.bind(this));
    this.routes.get('/colecao/:id', this.findById.bind(this));
    this.routes.post(
      '/colecao',
      CreateColecaoValidator,
      this.create.bind(this)
    );
    this.routes.put(
      '/colecao/:id',
      UpdateColecaoValidator,
      this.update.bind(this)
    );
    this.routes.delete('/colecao/:id', this.delete.bind(this));
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(422).json({ errors: result.array() });
      }
      const colecoes = await this.colecaoService.findAll(request.query.titulo as string);
      return response.json(colecoes);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const colecao = await this.colecaoService.findById(Number(id));
      return response.json(colecao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(422).json({ errors: result.array() });
      }
      const colecao = request.body as ColecaoInterface;
      const newColecao = await this.colecaoService.create(colecao);
      return response.json(newColecao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(422).json({ errors: result.array() });
      }
      const { id } = request.params;
      const colecao = request.body as ColecaoInterface;
      const updatedColecao = await this.colecaoService.update(
        Number(id),
        colecao
      );
      return response.json(updatedColecao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      await this.colecaoService.delete(Number(id));
      return response.json({ message: 'Colecao removida com sucesso!' });
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }
}

export default new ColecaoController();
