import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // Cria uma nova instância do serviço e do repositório antes de cada teste
  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock();
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });


  // Reseta os mocks após cada teste
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all ColecaoEntity objects', async () => {
      const result = await colecaoService.findAll(); // Chama o método findAll do serviço
      expect(result).toEqual(ManyColecaoFixture); // Espera que o resultado seja igual ao ManyColecaoFixture
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled(); // Espera que o método findAll do repositório tenha sido chamado
    });

    it('should call the repository with the specified title', async () => {
      await colecaoService.findAll('titulo'); // Chama o método findAll do serviço com o parâmetro 'titulo'
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo'); // Espera que o método findAll do repositório tenha sido chamado com o parâmetro 'titulo'
    });
  });

  describe('findById', () => {
    it('should return the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.findById(1); // Chama o método findById do serviço com o parâmetro 1
      expect(result).toEqual(OneColecaoFixture); // Espera que o resultado seja igual ao OneColecaoFixture
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Espera que o método findById do repositório tenha sido chamado com o parâmetro 1
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null); // Faz o método findById do repositório retornar null

      await expect(colecaoService.findById(1)).rejects.toThrow(AppError); // Espera que o método findById do serviço com o parâmetro 1 retorne um erro
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Espera que o método findById do repositório tenha sido chamado com o parâmetro 1
    });
  });

  describe('create', () => {
    it('should create a new ColecaoEntity object', async () => {
      const result = await colecaoService.create(ColecaoInterfaceFixture); // Chama o método create do serviço com o parâmetro ColecaoInterfaceFixture
      expect(result).toEqual(CreatedColecaoFixture); // Espera que o resultado seja igual ao CreatedColecaoFixture
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined }); // Espera que o método create do repositório tenha sido chamado com o parâmetro { ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined }
    });
  });

  describe('update', () => {
    it('should update the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.update(1, ColecaoInterfaceFixture); // Chama o método update do serviço com o parâmetro 1 e ColecaoInterfaceFixture

      expect(result).toEqual(OneColecaoFixture); // Espera que o resultado seja igual ao OneColecaoFixture
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Espera que o método getColecaoOnly do repositório tenha sido chamado com o parâmetro 1
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture }); // Espera que o método update do repositório tenha sido chamado com o parâmetro 1 e { ...OneColecaoFixture, ...ColecaoInterfaceFixture }
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null); // Faz o método getColecaoOnly do repositório retornar null
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError); // Espera que o método update do serviço com o parâmetro 1 e ColecaoInterfaceFixture retorne um erro
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Espera que o método getColecaoOnly do repositório tenha sido chamado com o parâmetro 1
    });
  });

  describe('delete', () => {
    it('should delete the ColecaoEntity object with the specified ID', async () => {
      await colecaoService.delete(1); // Chama o método delete do serviço com o parâmetro 1
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Espera que o método getColecaoOnly do repositório tenha sido chamado com o parâmetro 1
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1); // Espera que o método delete do repositório tenha sido chamado com o parâmetro 1
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null); // Faz o método getColecaoOnly do repositório retornar null
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError); // Espera que o método delete do serviço com o parâmetro 1 retorne um erro
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Espera que o método getColecaoOnly do repositório tenha sido chamado com o parâmetro 1
    });
  });
});
