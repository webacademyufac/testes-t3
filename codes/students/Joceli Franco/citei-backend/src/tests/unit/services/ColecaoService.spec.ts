import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

//Antes que cada teste seja executado, essas variáveis são configuradas para garantir que 
//os testes sejam realizados em um ambiente limpo e independente dos demais.
describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // beforeEach está realizando a configuração requerida antes de cada teste.
  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock();
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

//O afterEach está executar a limpeza e a restauração do estado dos mocks utilizados nos testes.
  afterEach(() => {
    jest.resetAllMocks();
  });
  
//Esses testes cobrem os métodos da classe ColecaoService, garantindo seu funcionamento adequado e
//interação correta com o repositório de coleções. Eles abrangem operações como busca, criação, 
//atualização e exclusão de coleções, lançando exceções caso ocorram erros inesperados.
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
