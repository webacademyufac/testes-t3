import CitacaoEntity from "../entities/CitacaoEntity";
import CitacaoInterface from "../interfaces/entities/CitacaoInterface";
import { AppDataSource } from "../../database/data-source";
import { CitacaoRepositoryInterface } from "../interfaces/repositories/CitacaoRepositoryInterface";
import { Repository } from "typeorm";

class CitacaoRepository implements CitacaoRepositoryInterface {
  private readonly citacaoRepository: Repository<CitacaoEntity>;

  constructor() {
    this.citacaoRepository = AppDataSource.getRepository(CitacaoEntity)
  }

  async findAll(titulo: string): Promise<CitacaoEntity[]> {
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
    
    if (titulo) {
      query += `WHERE citacao.titulo LIKE '%${titulo}%'`
    }

    return this.citacaoRepository.query(query)
  }

  async findById(id: number): Promise<CitacaoEntity | null> {
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
  
    const citacao = await this.citacaoRepository.query(query)

    return citacao.length ? citacao[0] : null
  }

  async getCitacaoOnly(id: number): Promise<CitacaoEntity> {
    return this.citacaoRepository.findOne({ where: { id } })
  }

  async create(colecao: CitacaoInterface): Promise<CitacaoEntity> {
    return this.citacaoRepository.save(colecao)
  }

  async update(id: number, colecao: CitacaoInterface): Promise<CitacaoEntity> {
    await this.citacaoRepository.update(id, colecao)
    return this.citacaoRepository.findOne({ where: { id } })
  }

  async delete(id: number): Promise<void> {
    await this.citacaoRepository.delete(id)
  }
}

export default new CitacaoRepository()