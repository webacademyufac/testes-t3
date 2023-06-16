import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock();
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all ColecaoEntity objects', async () => {
      // Verifica se o serviço retorna todos os objetos de ColecaoEntity
      const result = await colecaoService.findAll();
      expect(result).toEqual(ManyColecaoFixture);
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should call the repository with the specified title', async () => {
      // Verifica se o serviço chama o repositório com o título especificado
      await colecaoService.findAll('titulo');
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');
    });
  });

  describe('findById', () => {
    it('should return the ColecaoEntity object with the specified ID', async () => {
      // Verifica se o serviço retorna o objeto ColecaoEntity com o ID especificado
      const result = await colecaoService.findById(1);
      expect(result).toEqual(OneColecaoFixture);
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Verifica se o serviço lança um erro se o ColecaoEntity com o ID especificado não for encontrado
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new ColecaoEntity object', async () => {
      // Verifica se o serviço cria um novo objeto ColecaoEntity
      const result = await colecaoService.create(ColecaoInterfaceFixture);
      expect(result).toEqual(CreatedColecaoFixture);
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined });
    });
  });

  describe('update', () => {
    it('should update the ColecaoEntity object with the specified ID', async () => {
      // Verifica se o serviço atualiza o objeto ColecaoEntity com o ID especificado
      const result = await colecaoService.update(1, ColecaoInterfaceFixture);

      expect(result).toEqual(OneColecaoFixture);
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture });
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Verifica se o serviço lança um erro se o ColecaoEntity com o
