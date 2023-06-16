import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

// Descreve o conjunto de testes para a classe ColecaoService
describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // Executado antes de cada teste
  beforeEach(() => {
    // Cria uma instância do mock do repositório de coleções
    colecaoRepositoryMock = ColecaoRepositoryMock();
    // Cria uma instância do serviço ColecaoService, passando o mock do repositório
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

  // Executado após cada teste
  afterEach(() => {
    // Redefine todos os mocks criados durante os testes anteriores
    jest.resetAllMocks();
  });

  // Descreve o conjunto de testes para o método findAll
  describe('findAll', () => {
    // Teste: deve retornar todos os objetos ColecaoEntity
    it('should return all ColecaoEntity objects', async () => {
      // Chama o método findAll do serviço
      const result = await colecaoService.findAll();
      // Verifica se o resultado é igual ao fixture ManyColecaoFixture
      expect(result).toEqual(ManyColecaoFixture);
      // Verifica se o método findAll do repositório foi chamado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    // Teste: deve chamar o repositório com o título especificado
    it('should call the repository with the specified title', async () => {
      // Chama o método findAll do serviço passando um título
      await colecaoService.findAll('titulo');
      // Verifica se o método findAll do repositório foi chamado com o título especificado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');
    });
  });

  // Descreve o conjunto de testes para o método findById
  describe('findById', () => {
    // Teste: deve retornar o objeto ColecaoEntity com o ID especificado
    it('should return the ColecaoEntity object with the specified ID', async () => {
      // Chama o método findById do serviço passando um ID
      const result = await colecaoService.findById(1);
      // Verifica se o resultado é igual ao fixture OneColecaoFixture
      expect(result).toEqual(OneColecaoFixture);
      // Verifica se o método findById do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    // Teste: deve lançar um erro se o objeto ColecaoEntity com o ID especificado não for encontrado
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Simula o comportamento do repositório retornando null para o método findById
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);

      // Verifica se o método findById do serviço lança um erro
      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);
      // Verifica se o método findById do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  // Descreve o conjunto de testes para o método create
  describe('create', () => {
    // Teste: deve criar um novo objeto ColecaoEntity
    it('should create a new ColecaoEntity object', async () => {
      // Chama o método create do serviço passando um objeto ColecaoInterface
      const result = await colecaoService.create(ColecaoInterfaceFixture);
      // Verifica se o resultado é igual ao fixture CreatedColecaoFixture
      expect(result).toEqual(CreatedColecaoFixture);
      // Verifica se o método create do repositório foi chamado com os dados corretos
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined });
    });
  });

  // Descreve o conjunto de testes para o método update
  describe('update', () => {
    // Teste: deve atualizar o objeto ColecaoEntity com o ID especificado
    it('should update the ColecaoEntity object with the specified ID', async () => {
      // Chama o método update do serviço passando um ID e um objeto ColecaoInterface
      const result = await colecaoService.update(1, ColecaoInterfaceFixture);

      // Verifica se o resultado é igual ao fixture OneColecaoFixture
      expect(result).toEqual(OneColecaoFixture);
      // Verifica se o método getColecaoOnly do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      // Verifica se o método update do repositório foi chamado com o ID e os dados corretos
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture });
    });

    // Teste: deve lançar um erro se o objeto ColecaoEntity com o ID especificado não for encontrado
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Simula o comportamento do repositório retornando null para o método getColecaoOnly
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      // Verifica se o método update do serviço lança um erro
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError);
      // Verifica se o método getColecaoOnly do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });

  // Descreve o conjunto de testes para o método delete
  describe('delete', () => {
    // Teste: deve excluir o objeto ColecaoEntity com o ID especificado
    it('should delete the ColecaoEntity object with the specified ID', async () => {
      // Chama o método delete do serviço passando um ID
      await colecaoService.delete(1);
      // Verifica se o método getColecaoOnly do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      // Verifica se o método delete do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    // Teste: deve lançar um erro se o objeto ColecaoEntity com o ID especificado não for encontrado
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Simula o comportamento do repositório retornando null para o método getColecaoOnly
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);
      // Verifica se o método delete do serviço lança um erro
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError);
      // Verifica se o método getColecaoOnly do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
