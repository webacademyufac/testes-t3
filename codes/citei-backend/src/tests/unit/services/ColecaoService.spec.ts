//Essas importações são necessárias para definir os testes para o serviço de coleções ColecaoService

import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock"; 

//Essas variáveis serão inicializadas antes de cada teste para garantir que cada teste seja executado em um estado limpo e independente dos outros testes

describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

//O objetivo do beforeEach é realizar a configuração necessária antes de cada teste

  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock();
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

//O objetivo do afterEach é realizar a limpeza e redefinição do estado dos mocks utilizados nos testes

  afterEach(() => {
    jest.resetAllMocks();
  });

//Essa parte do código define testes para os métodos da classe ColecaoService, que é responsável por manipular operações relacionadas às coleções de dados
//Os testes verificam se os métodos estão funcionando corretamente, retornando os resultados esperados e interagindo adequadamente com o repositório de coleções
//Os testes cobrem cenários como buscar todas as coleções, buscar uma coleção por ID, criar uma nova coleção, atualizar uma coleção existente e excluir uma coleção
//Caso ocorram erros inesperados ou as operações não sejam realizadas corretamente, os testes lançam uma exceção AppError

  describe('findAll', () => {
    it('should return all ColecaoEntity objects', async () => {
      const result = await colecaoService.findAll();
      expect(result).toEqual(ManyColecaoFixture);
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should call the repository with the specified title', async () => {
      await colecaoService.findAll('titulo');
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');
    });
  });

  describe('findById', () => {
    it('should return the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.findById(1);
      expect(result).toEqual(OneColecaoFixture);
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new ColecaoEntity object', async () => {
      const result = await colecaoService.create(ColecaoInterfaceFixture);
      expect(result).toEqual(CreatedColecaoFixture);
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined });
    });
  });

  describe('update', () => {
    it('should update the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.update(1, ColecaoInterfaceFixture);

      expect(result).toEqual(OneColecaoFixture);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture });
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('should delete the ColecaoEntity object with the specified ID', async () => {
      await colecaoService.delete(1);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
