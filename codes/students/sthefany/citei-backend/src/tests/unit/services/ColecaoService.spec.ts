import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  beforeEach(() => {
    // Create an instance of the colecao repository mock
    colecaoRepositoryMock = ColecaoRepositoryMock();
    // Create an instance of the colecao service, passing the repository mock as a dependency
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

  afterEach(() => {
    // Reset all mocks after each test
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    // Test to verify that the findAll method of the service returns all ColecaoEntity objects
    it('should return all ColecaoEntity objects', async () => {
      const result = await colecaoService.findAll();
      expect(result).toEqual(ManyColecaoFixture);
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    // Test to verify that the findAll method of the service calls the repository with the specified title
    it('should call the repository with the specified title', async () => {
      await colecaoService.findAll('titulo');
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');
    });
  });

  describe('findById', () => {
    // Test to verify that the findById method of the service returns the ColecaoEntity object with the specified ID
    it('should return the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.findById(1);
      expect(result).toEqual(OneColecaoFixture);
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    // Test to verify that the findById method of the service throws an error if the ColecaoEntity with the specified ID is not found
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    // Test to verify that the create method of the service creates a new ColecaoEntity object
    it('should create a new ColecaoEntity object', async () => {
      const result = await colecaoService.create(ColecaoInterfaceFixture);
      expect(result).toEqual(CreatedColecaoFixture);
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined });
    });
  });

  describe('update', () => {
    // Test to verify that the update method of the service updates the ColecaoEntity object with the specified ID
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
