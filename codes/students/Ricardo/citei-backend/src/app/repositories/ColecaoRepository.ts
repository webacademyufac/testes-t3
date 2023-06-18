import ColecaoEntity from "../entities/ColecaoEntity";
import ColecaoInterface from "../interfaces/entities/ColecaoInterface";
import { AppDataSource } from "../../database/data-source";
import { ColecaoRepositoryInterface } from "../interfaces/repositories/ColecaoRepositoryInterface";

class ColecaoRepository implements ColecaoRepositoryInterface {
  private readonly colecaoRepository: any;
  constructor() {
    this.colecaoRepository = AppDataSource.getRepository(ColecaoEntity)
  }

  async findAll(titulo?: string): Promise<ColecaoEntity[]> {
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

    if(titulo) {
      query += `WHERE colecao.titulo LIKE '%${titulo}%'`
    }
  
    return this.colecaoRepository.query(query)
  }

  async findById(id: number): Promise<ColecaoEntity | undefined> {
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

    const colecao =  await this.colecaoRepository.query(query)

    return colecao.length ? colecao[0] : undefined
  }

  async getColecaoOnly(id: number): Promise<ColecaoEntity> {
    return this.colecaoRepository.findOne({ where: { id }})
  }

  async create (colecao: ColecaoInterface): Promise<ColecaoEntity> {
    return this.colecaoRepository.save(colecao)
  }

  async update (id: number, colecao: ColecaoInterface): Promise<ColecaoEntity> {
    await this.colecaoRepository.update(id, colecao)
    return this.colecaoRepository.findOne({ where: { id }})
  }

  async delete (id: number): Promise<void> {
    await this.colecaoRepository.delete(id)
  }
}

export default new ColecaoRepository();