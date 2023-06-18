import { AppError, HttpCode } from '../Errors/AppError';
import ColecaoEntity from '../entities/ColecaoEntity';
import ColecaoInterface from '../interfaces/entities/ColecaoInterface';
import { ColecaoRepositoryInterface } from '../interfaces/repositories/ColecaoRepositoryInterface';
import ColecaoServiceInterface from '../interfaces/services/ColecaoServiceInterface';
import ColecaoRepository from '../repositories/ColecaoRepository';

class ColecaoService implements ColecaoServiceInterface {
  private readonly colecaoRepository: ColecaoRepositoryInterface;

  constructor(colecaoRepository: ColecaoRepositoryInterface) {
    this.colecaoRepository = colecaoRepository;
  }

  async findAll(titulo?: string): Promise<ColecaoEntity[]> {
    return await this.colecaoRepository.findAll(titulo);
  }

  async findById(id: number): Promise<ColecaoEntity> {
    const colecao = await this.colecaoRepository.findById(id);
    if (colecao) {
      return colecao;
    }
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: `Citacao com ID ${id} Não encontrada.`,
    });
  }

  async create({
    autor,
    titulo,
    subtitulo,
    imagem,
  }: ColecaoInterface): Promise<ColecaoEntity> {
    return await this.colecaoRepository.create({
      autor,
      titulo,
      subtitulo,
      imagem,
    });
  }

  async update(
    id: number,
    { autor, titulo, subtitulo, imagem }: ColecaoInterface
  ): Promise<ColecaoEntity> {
    const colecao = await this.colecaoRepository.getColecaoOnly(id);

    if (!colecao) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Colecao com ID ${id} Não encontrada.`,
      });
    }

    if (autor) {
      colecao.autor = autor;
    }

    if (titulo) {
      colecao.titulo = titulo;
    }

    if (subtitulo) {
      colecao.subtitulo = subtitulo;
    }

    if (imagem) {
      colecao.imagem = imagem;
    }

    return await this.colecaoRepository.update(id, colecao);
  }

  async delete(id: number): Promise<void> {
    const colecao = await this.colecaoRepository.getColecaoOnly(id);
    if (!colecao) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Colecao com ID ${id} Não encontrada.`,
      });
    }
    return await this.colecaoRepository.delete(id);
  }
}

export default ColecaoService;
