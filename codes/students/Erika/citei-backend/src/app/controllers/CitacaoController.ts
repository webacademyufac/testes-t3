import { Request, Response, Router } from 'express';
import CitacaoService from '../services/CitacaoService';
import CitacaoInterface from '../interfaces/entities/CitacaoInterface';
import { validationResult } from 'express-validator';
import {
  CreateCitacaoValidator,
  GetCitacaoValidator,
  UpdateCitacaoValidator,
} from '../validators/CitacaoValidator';
import CitacaoRepository from '../repositories/CitacaoRepository';
import ColecaoRepository from '../repositories/ColecaoRepository';
import errorHandler from '../Errors/ErrorHandle';
import CitacaoServiceInterface from '../interfaces/services/CitacaoServiceInterface';

class CitacaoController {
  public routes = Router();
  private citacaoService: CitacaoServiceInterface;

  constructor() {
    this.citacaoService = new CitacaoService(
      CitacaoRepository,
      ColecaoRepository
    );
  
    this.routes.get('/citacao', GetCitacaoValidator, this.findAll.bind(this));
    this.routes.get('/citacao/:id', this.findById.bind(this));
    this.routes.post(
      '/citacao',
      CreateCitacaoValidator,
      this.create.bind(this)
    );
    this.routes.put(
      '/citacao/:id',
      UpdateCitacaoValidator,
      this.update.bind(this)
    );
    this.routes.delete('/citacao/:id', this.delete.bind(this));
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const citacoes = await this.citacaoService.findAll(request.query.titulo as string);
      return response.json(citacoes);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const citacao = await this.citacaoService.findById(Number(id));
      return response.json(citacao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
      }
      const citacao = request.body as CitacaoInterface;
      const newCitacao = await this.citacaoService.create(citacao);
      return response.json(newCitacao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
      }
      const { id } = request.params;
      const citacao = request.body as CitacaoInterface;
      const updatedCitacao = await this.citacaoService.update(
        Number(id),
        citacao
      );
      return response.json(updatedCitacao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      await this.citacaoService.delete(Number(id));
      return response.json({ message: 'Citacao removida com sucesso!' });
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }
}

export default new CitacaoController();
