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
    // Cria uma instância do mock do repositório de citações e do repositório de coleções
    citacaoRepositoryMock = CitacaoRepositoryMock();
    colecaoRepositoryMock = ColecaoRepositoryMock();

    // Cria uma instância do serviço de citação, passando os mocks dos repositórios como dependências
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    // Teste para verificar se o método findAll do serviço retorna todas as entidades de citação
    it('should return all CitacaoEntity objects', async () => {
      const result = await citacaoService.findAll();

      expect(result).toEqual(manyCitacoesFixture);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    // Teste para verificar se o método findAll do serviço envia parâmetros para o repositório de citações
    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao';
      const result = await citacaoService.findAll(titulo);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo);
    })
  });

  describe('findById', () => {
    // Teste para verificar se o método findById do serviço retorna a entidade de citação com o ID especificado
    it('should return the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.findById(1);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    // Teste para verificar se o método findById do serviço lança um erro se a entidade de citação com o ID especificado não for encontrada
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(citacaoService.findById(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    // Teste para verificar se o método create do serviço cria uma nova entidade de citação
    it('should create a new CitacaoEntity object', async () => {
      const result = await citacaoService.create(newCitacaoFixture);

      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture);
    });
  });

  describe('update', () => {
    // Teste para verificar se o método update do serviço atualiza a entidade de citação com o ID especificado
    it('should update the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 });
  
      expect(result).toEqual(OneCitacaoFixture);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao'});
    });
  
    // Teste para verificar se o método update do serviço lança um erro se a entidade de coleção com o ID especificado não for encontrada
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);
  
      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
    });
  
    // Teste para verificar se o método update do serviço lança um erro se a entidade de citação com o ID especificado não for encontrada
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);
  
      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });
  
  describe('delete', () => {
    // Teste para verificar se o método delete do serviço exclui a entidade de citação com o ID especificado
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      await citacaoService.delete(1);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });
  
    // Teste para verificar se o método delete do serviço lança um erro se a entidade de citação com o ID especificado não for encontrada
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);
  
      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });
  