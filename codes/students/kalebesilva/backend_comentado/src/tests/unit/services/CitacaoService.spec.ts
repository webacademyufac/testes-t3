import { AppError } from "../../../app/Errors/AppError";
import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import CitacaoService from "../../../app/services/CitacaoService";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture, newCitacaoFixture } from "../../config/fixtures/CitacaoFixtures";
import { CitacaoRepositoryMock } from "../../config/mocks/CitacaoRepositoryMock";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";


describe('CitacaoService', () => {// inicio do teste geral, o teste geral irá conter todos os testes relacionado a
//a classe citacao service.

  let citacaoService: CitacaoService; //criando variável service
  let citacaoRepositoryMock: CitacaoRepositoryInterface; //criando mock de citacao
  let colecaoRepositoryMock: ColecaoRepositoryInterface; // criando mock de colecao

  beforeEach(() => { // antes de proseguir
    citacaoRepositoryMock = CitacaoRepositoryMock(); //iniciando repositorio mock
    colecaoRepositoryMock = ColecaoRepositoryMock();// iniciando repositorio mock
    //instanciado citacao service
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  afterEach(() => { // depois de proseguir, resetar todos os mocks
    jest.resetAllMocks();
  });

  describe('findAll', () => { // teste da funcao findAll
    it('should return all CitacaoEntity objects', async () => { //mostrar todos os obj de citacao
      const result = await citacaoService.findAll(); // recebe a consulta do mock

      expect(result).toEqual(manyCitacoesFixture); // espera que o resultado seja de acordo com o código estático preparado
      //par validacao
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled(); //espera que o findAll seja chamado
    });

    it('should send params to CitacaoRepository', async () => {// mostra os parametros enviados a citacaoRepository
      const titulo = 'Citacao';// contruindo novo titulo
      const result = await citacaoService.findAll(titulo);// recebe o resultado da funcao, esperando que ela caia no if(titulo) 
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo); //espera que o resultado seja igual ao do obj estatico
    })
  });

  describe('findById', () => {// teste o find id
    it('should return the CitacaoEntity object with the specified ID', async () => {/*Mostra o returno do obj que possui determinada ID */
      const result = await citacaoService.findById(1); // recebe a query com a ID 1

      expect(result).toEqual(OneCitacaoFixture); // espera que seja igual a do obj estático
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);// espera que a funcao seja chamada
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {/*Mostra erro se não especificar a id */
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null); /* jest espiona o método par ver como ele vai se comportar 
      ao receber um parametro nulo*/

      await expect(citacaoService.findById(1)).rejects.toThrow(AppError);// espera que retorne um erro 
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);// espera que a funcao seja chamada com id
    });
  });

  describe('create', () => { // teste de criacao de novos registros
    it('should create a new CitacaoEntity object', async () => {/*Mostrar a criacao de um novo obj */
      const result = await citacaoService.create(newCitacaoFixture);// realiza a operacao de criacao

      expect(result).toEqual(OneCitacaoFixture);// espera que o resultado seja igual ao do obj estático
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture);// espera que a funcao seja chamada seguindo o determinado parametro
    });
  });

  describe('update', () => {// teste de atualizacao de registro
    it('should update the CitacaoEntity object with the specified ID', async () => { /*deve Mostra o updade de terminado obj especificando uma ID */
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 }); // realiza a operacao

      expect(result).toEqual(OneCitacaoFixture); // espera que o retorno seja igual ao do obj estático
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);// espera que a funcao retorne o obj desejado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao'}); // espera que seja feito o update
      // corretamente, de acordo com os parametros desejados
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => { // deve mostra erro se não tiver um ID no parametro da funcao
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);// jest, espionando pra ver o que vai acontecer

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError); // espera um erro
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);// espera o retorno de obj com ID 2
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {// deve mostra erro se não tiver um ID no parametro da funcao
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);// jest, espionando pra ver o que vai acontecer

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError); // espera um erro
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);// espera o retorno de obj com ID 1
    });
  });

  describe('delete', () => { // teste do método de delete
    it('should delete the CitacaoEntity object with the specified ID', async () => { /*deve delete um obj com id especifica */
      await citacaoService.delete(1); // espera deletar
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1); // espera que o obj foi deletado
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1); // espera que o método seja chamado
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => { // deve dar erro se a id não for passada por parametro
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);// jest espionando o método para ver como ele vai se comportar

      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);// espera que ele dê erro
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);// espera que o obj não tenha sido deletado
    });
  });
});
