import { AppError } from "../../../app/Errors/AppError";
import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import CitacaoService from "../../../app/services/CitacaoService";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture, newCitacaoFixture } from "../../config/fixtures/CitacaoFixtures";
import { CitacaoRepositoryMock } from "../../config/mocks/CitacaoRepositoryMock";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

// Descreve um conjunto de testes para o serviço CitacaoService
describe('CitacaoService', () => {
  let citacaoService: CitacaoService;
  let citacaoRepositoryMock: CitacaoRepositoryInterface;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // Executado antes de cada teste
  beforeEach(() => {
    citacaoRepositoryMock = CitacaoRepositoryMock();
    colecaoRepositoryMock = ColecaoRepositoryMock();
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  // Executado após cada teste
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Descreve um conjunto de testes para o método findAll do CitacaoService
  describe('findAll', () => {
    // Teste: deve retornar todos os objetos CitacaoEntity
    it('should return all CitacaoEntity objects', async () => {
      const result = await citacaoService.findAll();

      expect(result).toEqual(manyCitacoesFixture);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    // Teste: deve enviar parâmetros para o CitacaoRepository
    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao';
      const result = await citacaoService.findAll(titulo);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo);
    })
  });

  // Descreve um conjunto de testes para o método findById do CitacaoService
  describe('findById', () => {
    // Teste: deve retornar o objeto CitacaoEntity com o ID especificado
    it('should return the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.findById(1);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    // Teste: deve lançar um erro se o objeto CitacaoEntity com o ID especificado não for encontrado
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(citacaoService.findById(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  // Descreve um conjunto de testes para o método create do CitacaoService
  describe('create', () => {
    // Teste: deve criar um novo objeto CitacaoEntity
    it('should create a new CitacaoEntity object', async () => {
      const result = await citacaoService.create(newCitacaoFixture);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture);
    });
  });

  // Descreve um conjunto de testes para o método update do CitacaoService
  describe('update', () => {
    // Teste: deve atualizar o objeto CitacaoEntity com o ID especificado
    it('should update the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 });

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao'});
    });

    // Teste: deve lançar um erro se o objeto ColecaoEntity com o ID especificado não for encontrado
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
    });

    // Teste: deve lançar um erro se o objeto CitacaoEntity com o ID especificado não for encontrado
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });

  // Descreve um conjunto de testes para o método delete do CitacaoService
  describe('delete', () => {
    // Teste: deve excluir o objeto CitacaoEntity com o ID especificado
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      await citacaoService.delete(1);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    // Teste: deve lançar um erro se o objeto CitacaoEntity com o ID especificado não for encontrado
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
