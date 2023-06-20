import { AppError } from "../../../app/Errors/AppError";
import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import CitacaoService from "../../../app/services/CitacaoService";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture, newCitacaoFixture } from "../../config/fixtures/CitacaoFixtures";
import { CitacaoRepositoryMock } from "../../config/mocks/CitacaoRepositoryMock";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";


describe('CitacaoService', () => {
  let citacaoService: CitacaoService;
  let citacaoRepositoryMock: CitacaoRepositoryInterface;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  beforeEach(() => {
    citacaoRepositoryMock = CitacaoRepositoryMock();
    colecaoRepositoryMock = ColecaoRepositoryMock();
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all CitacaoEntity objects', async () => {
      const result = await citacaoService.findAll();

      expect(result).toEqual(manyCitacoesFixture);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled();
    });

   

    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao';
      const result = await citacaoService.findAll(titulo);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo);
    })
  });

   //*Testa o método findAll da classe CitacaoService.Podemos observar dois testes:
    //O primeiro teste verifica se o método findAll retorna todos os objetos CitacaoEntity. 
    //Ele verifica se o resultado retornado é igual ao valor esperado manyCitacoesFixture e se a 
    //função findAll de citacaoRepositoryMock foi chamada.
    //O segundo teste verifica se o método findAll envia os parâmetros corretos para citacaoRepositoryMock. 
    //Ele verifica se a função findAll de citacaoRepositoryMock foi chamada com o parâmetro titulo.

  describe('findById', () => {
    it('should return the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.findById(1);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(citacaoService.findById(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  //*Testa o método findById da classe CitacaoService. Existem dois testes dentro desse bloco.
//O primeiro teste verifica se o método findById retorna o objeto CitacaoEntity com o ID especificado. 
//Ele verifica se o resultado retornado é igual ao valor esperado OneCitacaoFixture e se a função findById 
//de citacaoRepositoryMock foi chamada com o parâmetro 1.
//O segundo teste verifica se o método findById lança um erro se o objeto CitacaoEntity com o ID especificado 
//não for encontrado. Ele simula a função findById de citacaoRepositoryMock para retornar null e verifica se o 
//erro AppError é lançado.

  describe('create', () => {
    it('should create a new CitacaoEntity object', async () => {
      const result = await citacaoService.create(newCitacaoFixture);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture);
    });
  });

  //*Testa o método create da classe CitacaoService. Há um único teste dentro desse bloco.
//O teste verifica se o método create cria um novo objeto CitacaoEntity. Ele verifica se o resultado retornado 
//é igual ao valor esperado OneCitacaoFixture e se a função create de citacaoRepositoryMock foi chamada com o 
//parâmetro newCitacaoFixture.

  describe('update', () => {
    it('should update the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 });

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao'});
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });

//*Testa o método update da classe CitacaoService. Existem três testes dentro desse bloco.
//O primeiro teste verifica se o método update atualiza o objeto CitacaoEntity com o ID e os dados especificados. 
//Ele verifica se o resultado retornado é igual ao valor esperado OneCitacaoFixture, se as funções getCitacaoOnly 
//de citacaoRepositoryMock e getColecaoOnly de colecaoRepositoryMock foram chamadas com os parâmetros corretos e 
//se a função update de citacaoRepositoryMock foi chamada com os parâmetros corretos.
//O segundo teste verifica se o método update lança um erro se o objeto ColecaoEntity com o ID especificado não 
//for encontrado. Ele simula a função getColecaoOnly de colecaoRepositoryMock para retornar null e verifica se o 
//erro AppError é lançado.
//O terceiro teste verifica se o método update lança um erro se o objeto CitacaoEntity com o ID especificado não 
//for encontrado. Ele simula a função getCitacaoOnly de citacaoRepositoryMock para retornar null e verifica se o erro AppError é lançado.
  describe('delete', () => {
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      await citacaoService.delete(1);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });
});

//Testa o método delete da classe CitacaoService. Existem dois testes dentro desse bloco.
//O primeiro teste verifica se o método delete exclui o objeto CitacaoEntity com o ID especificado. 
//Ele verifica se a função getCitacaoOnly de citacaoRepositoryMock foi chamada com o parâmetro 1 e se a 
//função delete de citacaoRepositoryMock foi chamada com o parâmetro 1.
//O segundo teste verifica se o método delete lança um erro se o objeto CitacaoEntity com o ID especificado 
//não for encontrado. Ele simula a função getCitacaoOnly de citacaoRepositoryMock para retornar null e verifica 
//se o erro AppError é lançado.