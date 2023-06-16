import CitacaoEntity from "../../entities/CitacaoEntity";
import CitacaoInterface from "../entities/CitacaoInterface";

/*Repository é onde contem as interfaces que possuem as funcoes que iremos usar para
interagir com o banco de dados, todas as classes que fizerem um acordo com ela, serao
obrigadas a implementar essas funcoes/métodos*/
export interface CitacaoRepositoryInterface {
  
  /*O primeiro método é o findAll, ele irá retornar uma colecao de objetos que tenham
  aqueles titulo*/
  findAll(titulo: string): Promise<CitacaoEntity[]>;

  /*O segundo é o findById, ele irá retornar apenas um registro do banco de dados,
  para isso, usaremos  a ID para pesquisar*/
  findById(id: number): Promise<CitacaoEntity>;

  /*O terceiro método é par que possamos criar um novo registro no banco de dados, para 
  que isso seja possivel, é necessário que seja passado um objeto citacao, que deve ter caracteristicas
  da interface citacaoInterface*/
  create(citacao: CitacaoInterface): Promise<CitacaoEntity>;

  /*O quarto método é o de update, ele irá atualizar um registro em específico no  banco de dados,
  para que isso seja possivel, além de passar um obj citacao, devemos informar qual será a ID do obj que iremos 
  atualizar. */
  update(id: number, citacao: CitacaoInterface): Promise<CitacaoEntity>;

  /*O quinto método é o de delete, ele irá apagar do banco de dados um registro que contenha aquela determinda ID */
  delete(id: number): Promise<void>;

  /*O sexto método tem o objetivo de buscar apenas uma citacao em específico, para isso ela irá utilizar a ID como base
  para a pesqusisa. */
  getCitacaoOnly(id: number): Promise<CitacaoEntity>
}