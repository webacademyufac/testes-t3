import { AppError, HttpCode } from '../Errors/AppError';
import CitacaoEntity from '../entities/CitacaoEntity';
import CitacaoInterface from '../interfaces/entities/CitacaoInterface';
import { CitacaoRepositoryInterface } from '../interfaces/repositories/CitacaoRepositoryInterface';
import { ColecaoRepositoryInterface } from '../interfaces/repositories/ColecaoRepositoryInterface';
import CitacaoServiceInterface from '../interfaces/services/CitacaoServiceInterface';
import 'express-async-errors';

class CitacaoService implements CitacaoServiceInterface { 
  
  private readonly citacaoRepository: CitacaoRepositoryInterface; // cria objetos para leitura
  private readonly colecaoRepository: ColecaoRepositoryInterface;

  constructor(
    citacaoRepository: CitacaoRepositoryInterface, // parametros para o construtor
    colecaoRepository: ColecaoRepositoryInterface
  ) {
    this.citacaoRepository = citacaoRepository; // objetos da classe recebendo os objetos parametros do construtor
    this.colecaoRepository = colecaoRepository;
  }

  async findAll(titulo?: string): Promise<CitacaoEntity[]> {// busca todos os objetos no banco de dados
    return await this.citacaoRepository.findAll(titulo); // retorna a colecao retornada do BD
  }

  async findById(id: number): Promise<CitacaoEntity> { 
    const citacao = await this.citacaoRepository.findById(id); // realiza a operacao
    if (citacao) { //verifica se o resposta é existente ou não
      return citacao;
    }
    throw new AppError({ // devolve uma mensagem 
      httpCode: HttpCode.NOT_FOUND,
      description: `Citacao com ID ${id} Não encontrada.`,
    });
  }

  async create({ // funcao de insersao no BD
    titulo,
    id_colecao,
  }: CitacaoInterface): Promise<CitacaoEntity> {
    return await this.citacaoRepository.create({ titulo, id_colecao }); // insere e retorna o obj criado
  }

  async update( // atualiza um registro em especifico
    id: number,
    { titulo, id_colecao }: CitacaoInterface
  ): Promise<CitacaoEntity> {
    const citacao = await this.citacaoRepository.getCitacaoOnly(id); // verifica se o obj existe no banco de dados

    if (!citacao) { // se não existe, então devolve que não encontrou
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Citacao com ID ${id} Não encontrada.`,
      });
    }

    if (titulo) { // verifica se a funcao foi passada com um titulo(já que ele é opcional)
      citacao.titulo = titulo;
    }

    if (id_colecao) { // verifica se a id foi passada como parametro 
      const colecao = await this.colecaoRepository.getColecaoOnly(id_colecao); // verifica se aquele obj, com a id do parametro existe
      if (!colecao) { //se não achar nada, então retorna que não achou a ID
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Colecao com ID ${id_colecao} Não encontrada.`,
        });
      }
      citacao.id_colecao = id_colecao; // se não retornar um erro, é pq existe, então irá atribuila ao obj
    }

    return await this.citacaoRepository.update(id, citacao); // retorna resultado do update, depois de fazer a opracao 
  }

  async delete(id: number): Promise<void> { // deleta um registro
    const citacao = await this.citacaoRepository.getCitacaoOnly(id);// verifica se o registro existe
    if (!citacao) {// se não existir, retorna um erro de ID nao encontrada
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Citacao com ID ${id} Não encontrada.`,
      });
    }
    await this.citacaoRepository.delete(id); //realiza a exluisao do registro
  }
}

export default CitacaoService;// exporta a classe para ser usada em outras partes da aplicacao
