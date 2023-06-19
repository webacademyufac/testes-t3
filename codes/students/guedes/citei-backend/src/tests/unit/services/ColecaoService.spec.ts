import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // Esta função é executada antes de cada caso de teste individual
  beforeEach(() => {
    // Cria um mock da interface ColecaoRepositoryInterface
    colecaoRepositoryMock = ColecaoRepositoryMock();
    // Cria uma instância do ColecaoService, passando o repositório simulado
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

  // Esta função é executada após cada caso de teste individual
  afterEach(() => {
    // Reseta todas as funções simuladas
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar todos os objetos ColecaoEntity', async () => {
      // Chama o método "findAll" do serviço
      const result = await colecaoService.findAll();
      // Espera que o resultado seja igual ao objeto ManyColecaoFixture
      expect(result).toEqual(ManyColecaoFixture);
      // Espera que o método "findAll" do repositório simulado tenha sido chamado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('deve chamar o repositório com o título especificado', async () => {
      // Chama o método "findAll" do serviço com um parâmetro de título
      await colecaoService.findAll('titulo');
      // Espera que o método "findAll" do repositório simulado tenha sido chamado com o título especificado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');
    });
  });

  describe('findById', () => {
    it('deve retornar o objeto ColecaoEntity com o ID especificado', async () => {
      // Chama o método "findById" do serviço com um parâmetro de ID
      const result = await colecaoService.findById(1);
      // Espera que o resultado seja igual ao objeto OneColecaoFixture
      expect(result).toEqual(OneColecaoFixture);
      // Espera que o método "findById" do repositório simulado tenha sido chamado com o ID especificado
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('deve lançar um erro se o ColecaoEntity com o ID especificado não for encontrado', async () => {
      // Simula que o método "findById" do repositório simulado retorne null
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);

      // Espera que o método "findById" do serviço lance um AppError quando chamado com um parâmetro de ID
      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);
      // Espera que o método "findById" do repositório simulado tenha sido chamado com o ID especificado
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('deve criar um novo objeto ColecaoEntity', async () => {
      // Chama o método "create" do serviço com um objeto ColecaoInterfaceFixture
      const result = await colecaoService.create(ColecaoInterfaceFixture);
      // Espera que o resultado seja igual ao objeto CreatedColecaoFixture
      expect(result).toEqual(CreatedColecaoFixture);
      // Espera que o método "create" do repositório simulado tenha sido chamado com o objeto mesclado
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined });
    });
  });

  describe('update', () => {
    it('deve atualizar o objeto ColecaoEntity com o ID especificado', async () => {
      // Chama o método "update" do serviço com um parâmetro de ID e um objeto ColecaoInterfaceFixture
      const result = await colecaoService.update(1, ColecaoInterfaceFixture);

      // Espera que o resultado seja igual ao objeto OneColecaoFixture
      expect(result).toEqual(OneColecaoFixture);
      // Espera que o método "getColecaoOnly" do repositório simulado tenha sido chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      // Espera que o método "update" do repositório simulado tenha sido chamado com o ID e objeto mesclado especificados
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture });
    });

    it('deve lançar um erro se o ColecaoEntity com o ID especificado não for encontrado', async () => {
      // Simula que o método "getColecaoOnly" do repositório simulado retorne null
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);
      
      // Espera que o método "update" do serviço lance um AppError quando chamado com um parâmetro de ID e um objeto ColecaoInterfaceFixture
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError);
      // Espera que o método "getColecaoOnly" do repositório simulado tenha sido chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('deve excluir o objeto ColecaoEntity com o ID especificado', async () => {
      // Chama o método "delete" do serviço com um parâmetro de ID
      await colecaoService.delete(1);
      // Espera que o método "getColecaoOnly" do repositório simulado tenha sido chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      // Espera que o método "delete" do repositório simulado tenha sido chamado com o ID especificado
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('deve lançar um erro se o ColecaoEntity com o ID especificado não for encontrado', async () => {
      // Simula que o método "getColecaoOnly" do repositório simulado retorne null
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);
      
      // Espera que o método "delete" do serviço lance um AppError quando chamado com um parâmetro de ID
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError);
      // Espera que o método "getColecaoOnly" do repositório simulado tenha sido chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
