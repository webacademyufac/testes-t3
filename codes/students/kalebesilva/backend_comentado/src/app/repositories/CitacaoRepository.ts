import CitacaoEntity from "../entities/CitacaoEntity";
import CitacaoInterface from "../interfaces/entities/CitacaoInterface";
import { AppDataSource } from "../../database/data-source";
import { CitacaoRepositoryInterface } from "../interfaces/repositories/CitacaoRepositoryInterface";
import { Repository } from "typeorm";

class CitacaoRepository implements CitacaoRepositoryInterface { /*Classe citacao repositore que firma um contrato com 
a interface citacaoRepository */
  private readonly citacaoRepository: Repository<CitacaoEntity>; //Variável de leitura para ser usada ao decorrer da classe

  constructor() { // construtor para injecao de dependencias
    this.citacaoRepository = AppDataSource.getRepository(CitacaoEntity)
  }

  async findAll(titulo: string): Promise<CitacaoEntity[]> { // método FindAll, busca essa 
    //query a seguir no banco de dados e retornar uma colecao de objetos.
    let query = `
    SELECT
      citacao.id,
      citacao.titulo as citacao_titulo,
      citacao.created_at as citacao_created_at,
      colecao.id as colecao_id,
      colecao.titulo as colecao_titulo,
      colecao.subtitulo as colecao_subtitulo,
      colecao.imagem as colecao_imagem,
      colecao.autor as colecao_autor
    FROM
      citacao
    LEFT JOIN
      colecao ON citacao.id_colecao = colecao.id
  `;
    
    if (titulo) { // verfica se é uma pesquisa por um titulo específico, se o método for
      // chamado sem nenhum atributo, entao trará todos os registros citacao, mas se tiver um titulo, então
      //retornara todas as citacoes que possuam aquele titulo.
      query += `WHERE citacao.titulo LIKE '%${titulo}%'`
    }

    return this.citacaoRepository.query(query)// retorna a colecao de registros
  }

  async findById(id: number): Promise<CitacaoEntity | null> { /*Método para buscar uma citacao em especifico no banco de dados,
  o retorno dela pode ser null, caso não encontre a citacao ou o registro caso encontre. */
  /*Query que irá ser utilizada para buscar a citacao */  
  const query = ` 
    SELECT
      citacao.id,
      citacao.titulo as citacao_titulo,
      citacao.created_at as citacao_created_at,
      colecao.id as colecao_id,
      colecao.titulo as colecao_titulo,
      colecao.subtitulo as colecao_subtitulo,
      colecao.imagem as colecao_imagem,
      colecao.autor as colecao_autor
    FROM
      citacao
    INNER JOIN
      colecao ON citacao.id_colecao = colecao.id
    WHERE
      citacao.id = ${id}`;
  
    const citacao = await this.citacaoRepository.query(query) // salva a resposta em uma variável

    return citacao.length ? citacao[0] : null // verifica se ela é nula ou não, se for sim, retorna 
    // o registro, se não, retorna null.
  }

  async getCitacaoOnly(id: number): Promise<CitacaoEntity> { //método para pegar apenas uma citacao
    return this.citacaoRepository.findOne({ where: { id } })// Retorna apenas um registro e ele utiliza uma funcao do framework
  }

  async create(colecao: CitacaoInterface): Promise<CitacaoEntity> { // método para inserir um novo registro no banco de dados
    return this.citacaoRepository.save(colecao)// returna o item salvo e para salvar, utilizar o método save do framework
  }

  async update(id: number, colecao: CitacaoInterface): Promise<CitacaoEntity> {/*Método update, atualiza um registro no banco de dados */
    await this.citacaoRepository.update(id, colecao)// espera realizar o update 
    return this.citacaoRepository.findOne({ where: { id } }) // retorna ao usuário o registro que foi alterado,
    //utilizando uma funcao de busca.
  }

  async delete(id: number): Promise<void> { // deleta um registro do banco de dados
    await this.citacaoRepository.delete(id) //aguarda enquanto a operacao para deleta o registro está em andamento
  }
}

export default new CitacaoRepository() // exporta a classe para ser usada em outras partes da aplicacao.