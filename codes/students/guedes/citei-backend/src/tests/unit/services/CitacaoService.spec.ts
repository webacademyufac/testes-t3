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
    // Cria instâncias dos mocks para as interfaces de repositório
    citacaoRepositoryMock = CitacaoRepositoryMock();
    colecaoRepositoryMock = ColecaoRepositoryMock();

    // Cria uma instância do CitacaoService com os mocks dos repositórios
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  afterEach(() => {
    // Reinicia todos os mocks após cada teste
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all CitacaoEntity objects', async () => {
      // Chama o método findAll do citacaoService e verifica se o resultado é igual ao fixture manyCitacoesFixture
      const result = await citacaoService.findAll();
      expect(result).toEqual(manyCitacoesFixture);

      // Verifica se o método findAll do citacaoRepositoryMock foi chamado
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao';

      // Chama o método findAll do citacaoService com o parâmetro "titulo" e verifica se o método findAll do citacaoRepositoryMock foi chamado com o mesmo parâmetro
      const result = await citacaoService.findAll(titulo);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo);
    });
  });

  describe('findById', () => {
    it('should return the CitacaoEntity object with the specified ID', async () => {
      // Chama o método findById do citacaoService com o ID 1 e verifica se o resultado é igual ao fixture OneCitacaoFixture
      const result = await citacaoService.findById(1);
      expect(result).toEqual(OneCitacaoFixture);

      // Verifica se o método findById do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      // Configura o mock do citacaoRepositoryMock para retornar null quando o método findById for chamado com o ID 1
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null);

      // Chama o método findById do citacaoService com o ID 1 e verifica se uma exceção do tipo AppError é lançada
      await expect(citacaoService.findById(1)).rejects.toThrow(AppError);

      // Verifica se o método findById do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new CitacaoEntity object', async () => {
      // Chama o método create do citacaoService com o objeto newCitacaoFixture e verifica se o resultado é igual ao fixture OneCitacaoFixture
      const result = await citacaoService.create(newCitacaoFixture);
      expect(result).toEqual(OneCitacaoFixture);

      // Verifica se o método create do citacaoRepositoryMock foi chamado com o objeto newCitacaoFixture
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture);
    });
  });

  describe('update', () => {
    it('should update the CitacaoEntity object with the specified ID', async () => {
      // Chama o método update do citacaoService com o ID 1 e um objeto contendo as propriedades a serem atualizadas e verifica se o resultado é igual ao fixture OneCitacaoFixture
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 });
      expect(result).toEqual(OneCitacaoFixture);

      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 2
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);

      // Verifica se o método update do citacaoRepositoryMock foi chamado com o ID 1 e o objeto contendo as propriedades atualizadas
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao' });
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Configura o mock do colecaoRepositoryMock para retornar null quando o método getColecaoOnly for chamado com o ID 2
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      // Chama o método update do citacaoService com o ID 1 e um objeto contendo as propriedades a serem atualizadas e verifica se uma exceção do tipo AppError é lançada
      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 2
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      // Configura o mock do citacaoRepositoryMock para retornar null quando o método getCitacaoOnly for chamado com o ID 1
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      // Chama o método update do citacaoService com o ID 1 e um objeto contendo as propriedades a serem atualizadas e verifica se uma exceção do tipo AppError é lançada
      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);

      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      // Chama o método delete do citacaoService com o ID 1
      await citacaoService.delete(1);

      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);

      // Verifica se o método delete do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      // Configura o mock do citacaoRepositoryMock para retornar null quando o método getCitacaoOnly for chamado com o ID 1
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      // Chama o método delete do citacaoService com o ID 1 e verifica se uma exceção do tipo AppError é lançada
      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);

      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
