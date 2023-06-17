import ColecaoEntity from "../entities/ColecaoEntity";
import ColecaoInterface from "../interfaces/entities/ColecaoInterface";
import { AppDataSource } from "../../database/data-source";
import { ColecaoRepositoryInterface } from "../interfaces/repositories/ColecaoRepositoryInterface";

class ColecaoRepository implements ColecaoRepositoryInterface {/*Classe colecao repository, implementa o contrato com colecaoRepositoryInterface */
  private readonly colecaoRepository: any; // cria uma variável para leitura que pode conter any types.
  constructor() {//construtor de classe, utilizado para injecao de dependencias.
    this.colecaoRepository = AppDataSource.getRepository(ColecaoEntity) 
  }

  async findAll(titulo?: string): Promise<ColecaoEntity[]> { // busca todos os registros de colecao, pode receber ou não um parametro
    //busca todas as colecaoes no banco de dados
    let query = `
    SELECT
      colecao.id as colecao_id,
      colecao.titulo as colecao_titulo,
      colecao.subtitulo as colecao_subtitulo,
      colecao.imagem as colecao_imagem,
      colecao.autor as colecao_autor,
      colecao.created_at
    FROM
      colecao
  `;

    if(titulo) {// se a funcao tiver sido solicitada com um parametro, ele irá procurar apenas colecoes com aquele titulo
      query += `WHERE colecao.titulo LIKE '%${titulo}%'`
    }
  
    return this.colecaoRepository.query(query) // retorna a resposta do banco de dados
  }

  async findById(id: number): Promise<ColecaoEntity | undefined> { // funcao para buscar uma colecao em especifico 
    //query para que a operacao seja realizada
    const query = `
    SELECT
      colecao.id as colecao_id,
      colecao.titulo as colecao_titulo,
      colecao.subtitulo as colecao_subtitulo,
      colecao.imagem as colecao_imagem,
      colecao.autor as colecao_autor,
      colecao.created_at
    FROM
      colecao
    WHERE
      colecao.id = ${id}`;

    const colecao =  await this.colecaoRepository.query(query) // recebe a resposta do banco de dados

    return colecao.length ? colecao[0] : undefined // verifica a resposta e envia, se tiver um registro, retorna ele, se não, retorna underfined
  }

  async getColecaoOnly(id: number): Promise<ColecaoEntity> {//retrona apenas uma colecao
    return this.colecaoRepository.findOne({ where: { id }})// retorna a resposta da funcao findOne, um registro contendo aquele ID
  }

  async create (colecao: ColecaoInterface): Promise<ColecaoEntity> {// Cria um novo registro no banco de dados
    return this.colecaoRepository.save(colecao)// cria e em seguida retorna a resposta do método save.
  }

  async update (id: number, colecao: ColecaoInterface): Promise<ColecaoEntity> {// atualiza um registro no banco de dados
    await this.colecaoRepository.update(id, colecao)// realiza a atualizacao do registro
    return this.colecaoRepository.findOne({ where: { id }})// retorna ao usuário qual registro foi atualizado
  }

  async delete (id: number): Promise<void> {// apaga um registro no banco de dados
    await this.colecaoRepository.delete(id)// realiza a exclucao do registro
  }
}

export default new ColecaoRepository();