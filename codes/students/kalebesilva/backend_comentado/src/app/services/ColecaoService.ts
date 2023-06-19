import { AppError, HttpCode } from '../Errors/AppError';
import ColecaoEntity from '../entities/ColecaoEntity';
import ColecaoInterface from '../interfaces/entities/ColecaoInterface';
import { ColecaoRepositoryInterface } from '../interfaces/repositories/ColecaoRepositoryInterface';
import ColecaoServiceInterface from '../interfaces/services/ColecaoServiceInterface';
import ColecaoRepository from '../repositories/ColecaoRepository';

class ColecaoService implements ColecaoServiceInterface {
  private readonly colecaoRepository: ColecaoRepositoryInterface; // cria obj de leitura colecaoRepository

  constructor(colecaoRepository: ColecaoRepositoryInterface) { 
    this.colecaoRepository = colecaoRepository;
  }

  async findAll(titulo?: string): Promise<ColecaoEntity[]> { // busca todos os objetos no banco de dados
    return await this.colecaoRepository.findAll(titulo);// retorna a colecao retornada do BD
  }

  async findById(id: number): Promise<ColecaoEntity> {
    const colecao = await this.colecaoRepository.findById(id); // realiza a operacao
    if (colecao) { //verifica se colecao possui algum conteudo 
      return colecao;
    }
    throw new AppError({ // não possuindo, retorna uma mensagem que a ID nao foi encontrada
      httpCode: HttpCode.NOT_FOUND,
      description: `Citacao com ID ${id} Não encontrada.`,
    });
  }

  async create({ // cria uma nova colecao
    autor,
    titulo,
    subtitulo,
    imagem,
  }: ColecaoInterface): Promise<ColecaoEntity> {
    return await this.colecaoRepository.create({ // insere a colecao no BD
      autor,
      titulo,
      subtitulo,
      imagem,
    });
  }

  async update( //Atualiza uma colecao
    id: number,
    { autor, titulo, subtitulo, imagem }: ColecaoInterface
  ): Promise<ColecaoEntity> {
    const colecao = await this.colecaoRepository.getColecaoOnly(id); // verifica se encontra o registro

    if (!colecao) { // se o conteudo de colecao for vazio, entao o obj nao foi encontrado
      throw new AppError({//devolve uma mensagem falando que a id nao foi achada
        httpCode: HttpCode.NOT_FOUND,
        description: `Colecao com ID ${id} Não encontrada.`,
      });
    }

    // verifica se os campos passados no parametro possuem conteúdo, se sim, então atribuirá ao obj colecao
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

    return await this.colecaoRepository.update(id, colecao); // realiza o update e retorna a resposta do método
  }

  async delete(id: number): Promise<void> { // apaga um registro
    const colecao = await this.colecaoRepository.getColecaoOnly(id); // verifica se o obj existe
    if (!colecao) {// se o conteudo de colecao for vazio, entao a busca nao encontrou nada
      throw new AppError({ // devolve uma mensagem de id nao encontrada
        httpCode: HttpCode.NOT_FOUND,
        description: `Colecao com ID ${id} Não encontrada.`,
      });
    }
    return await this.colecaoRepository.delete(id); //realiza a exclusao do registro 
  }
}

export default ColecaoService; // exporta a classe para ser usada em outras partes da aplicacao
