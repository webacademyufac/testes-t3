import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock(); // Cria uma instância do mock do repositório
    colecaoService = new ColecaoService(colecaoRepositoryMock); // Cria uma instância do ColecaoService usando o mock do repositório
  });

  afterEach(() => {
    jest.resetAllMocks(); // Reseta todos os mocks após cada teste
  });

  describe('findAll', () => {
    it('should return all ColecaoEntity objects', async () => {
      const result = await colecaoService.findAll(); // Chama o método findAll do ColecaoService
      expect(result).toEqual(ManyColecaoFixture); // Verifica se o resultado é igual ao ManyColecaoFixture
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled(); // Verifica se o método findAll do mock do repositório foi chamado
    });

    it('should call the repository with the specified title', async () => {
      await colecaoService.findAll('titulo'); // Chama o método findAll do ColecaoService com um título especificado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo'); // Verifica se o método findAll do mock do repositório foi chamado com o título especificado
    });
  });

  describe('findById', () => {
    it('should return the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.findById(1); // Chama o método findById do ColecaoService com um ID especificado
      expect(result).toEqual(OneColecaoFixture); // Verifica se o resultado é igual ao OneColecaoFixture
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Verifica se o método findById do mock do repositório foi chamado com o ID especificado
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null); // Espiona o método findById do mock do repositório e define o valor de retorno como null

      await expect(colecaoService.findById(1)).rejects.toThrow(AppError); // Verifica se chamar o método findById do ColecaoService com o ID especificado lança um erro AppError
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Verifica se o método findById do mock do repositório foi chamado com o ID especificado
    });
  });

  describe('create', () => {
    it('should create a new ColecaoEntity object', async () => {
      const result = await colecaoService.create(ColecaoInterfaceFixture); // Chama o método create do ColecaoService com um objeto ColecaoInterfaceFixture
      expect(result).toEqual(CreatedColecaoFixture); // Verifica se o resultado é igual ao CreatedColecaoFixture
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined }); // Verifica se o método create do mock do repositório foi chamado com os argumentos corretos
    });
  });

  describe('update', () => {
    it('should update the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.update(1, ColecaoInterfaceFixture); // Chama o método update do ColecaoService com um ID e um objeto ColecaoInterfaceFixture

      expect(result).toEqual(OneColecaoFixture); // Verifica se o resultado é igual ao OneColecaoFixture
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture }); // Verifica se o método update do mock do repositório foi chamado com os argumentos corretos
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null); // Espiona o método getColecaoOnly do mock do repositório e define o valor de retorno como null
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError); // Verifica se chamar o método update do ColecaoService com o ID especificado lança um erro AppError
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
    });
  });

  describe('delete', () => {
    it('should delete the ColecaoEntity object with the specified ID', async () => {
      await colecaoService.delete(1); // Chama o método delete do ColecaoService com um ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1); // Verifica se o método delete do mock do repositório foi chamado com o ID especificado
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null); // Espiona o método getColecaoOnly do mock do repositório e define o valor de retorno como null
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError); // Verifica se chamar o método delete do ColecaoService com o ID especificado lança um erro AppError
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
    });
  });
});
