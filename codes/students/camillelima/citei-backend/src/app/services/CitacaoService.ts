import { AppError, HttpCode } from '../Errors/AppError';
import CitacaoEntity from '../entities/CitacaoEntity';
import CitacaoInterface from '../interfaces/entities/CitacaoInterface';
import { CitacaoRepositoryInterface } from '../interfaces/repositories/CitacaoRepositoryInterface';
import { ColecaoRepositoryInterface } from '../interfaces/repositories/ColecaoRepositoryInterface';
import CitacaoServiceInterface from '../interfaces/services/CitacaoServiceInterface';
import 'express-async-errors';

class CitacaoService implements CitacaoServiceInterface {
  private readonly citacaoRepository: CitacaoRepositoryInterface;
  private readonly colecaoRepository: ColecaoRepositoryInterface;

  constructor(
    citacaoRepository: CitacaoRepositoryInterface,
    colecaoRepository: ColecaoRepositoryInterface
  ) {
    this.citacaoRepository = citacaoRepository;
    this.colecaoRepository = colecaoRepository;
  }

  async findAll(titulo?: string): Promise<CitacaoEntity[]> {
    return await this.citacaoRepository.findAll(titulo);
  }

  async findById(id: number): Promise<CitacaoEntity> {
    const citacao = await this.citacaoRepository.findById(id);
    if (citacao) {
      return citacao;
    }
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: `Citacao com ID ${id} Não encontrada.`,
    });
  }

  async create({
    titulo,
    id_colecao,
  }: CitacaoInterface): Promise<CitacaoEntity> {
    return await this.citacaoRepository.create({ titulo, id_colecao });
  }

  async update(
    id: number,
    { titulo, id_colecao }: CitacaoInterface
  ): Promise<CitacaoEntity> {
    const citacao = await this.citacaoRepository.getCitacaoOnly(id);

    if (!citacao) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Citacao com ID ${id} Não encontrada.`,
      });
    }

    if (titulo) {
      citacao.titulo = titulo;
    }

    if (id_colecao) {
      const colecao = await this.colecaoRepository.getColecaoOnly(id_colecao);
      if (!colecao) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Colecao com ID ${id_colecao} Não encontrada.`,
        });
      }
      citacao.id_colecao = id_colecao;
    }

    return await this.citacaoRepository.update(id, citacao);
  }

  async delete(id: number): Promise<void> {
    const citacao = await this.citacaoRepository.getCitacaoOnly(id);
    if (!citacao) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Citacao com ID ${id} Não encontrada.`,
      });
    }
    await this.citacaoRepository.delete(id);
  }
}

export default CitacaoService;
