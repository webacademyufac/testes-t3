import { AppError } from "../../../app/Errors/AppError";
import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import CitacaoService from "../../../app/services/CitacaoService";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture, newCitacaoFixture } from "./src/tests/config/fixtures/CitacaoFixtures";
import { CitacaoRepositoryMock } from "./src/tests/config/mocks/CitacaoRepositoryMock";
import { ColecaoRepositoryMock } from "./src/tests/config/mocks/ColecaoRepositoryMock";

// Descreve um conjunto de testes para o serviço CitacaoService
describe('CitacaoService', () => {
  let citacaoService: CitacaoService;
  let citacaoRepositoryMock: CitacaoRepositoryInterface;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // Executa antes de cada teste
  beforeEach(() => {
    // Cria uma instância mock do repositório de citações
    citacaoRepositoryMock = CitacaoRepositoryMock();
    // Cria uma instância mock do repositório de coleções
    colecaoRepositoryMock = ColecaoRepositoryMock();
    // Cria uma instância do serviço CitacaoService passando os mocks dos repositórios
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  // Executa após cada teste
  afterEach(() => {
    // Reseta todos os mocks
    jest.resetAllMocks();
  });

  // Descreve um conjunto de testes para o método findAll
  describe('findAll', () => {
    // Testa se o método retorna todos os objetos CitacaoEntity
    it('should return all CitacaoEntity objects', async () => {
      const result = await citacaoService.findAll();

      expect(result).toEqual(manyCitacoesFixture);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    // Testa se o método envia os parâmetros para o CitacaoRepository
    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao';
      const result = await citacaoService.findAll(titulo);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo);
    })
  });

  // Descreve um conjunto de testes para o método findById
  describe('findById', () => {
    // Testa se o método retorna o objeto CitacaoEntity com o ID especificado
    it('should return the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.findById(1);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    // Testa se o método lança um erro se a entidade CitacaoEntity com o ID especificado não for encontrada
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(citacaoService.findById(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  // Descreve um conjunto de testes para o método create
  describe('create', () => {
    // Testa se o método cria um novo objeto CitacaoEntity
    it('should create a new CitacaoEntity object', async () => {
      const result = await citacaoService.create(newCitacaoFixture);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture);
    });
  });

  // Descreve um conjunto de testes para o método update
  describe('update', () => {
    // Testa se o método atualiza o objeto CitacaoEntity com o ID especificado
    it('should update the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 });

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao'});
    });

    // Testa se o método lança um erro se a entidade ColecaoEntity com o ID especificado não for encontrada
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
    });

    // Testa se o método lança um erro se a entidade CitacaoEntity com o ID especificado não for encontrada
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });

  // Descreve um conjunto de testes para o método delete
  describe('delete', () => {
    // Testa se o método deleta o objeto CitacaoEntity com o ID especificado
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      await citacaoService.delete(1);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    // Testa se o método lança um erro se a entidade CitacaoEntity com o ID especificado não for encontrada
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
