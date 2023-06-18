import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";


describe('ColecaoService', () => {
  let colecaoService: ColecaoService; // variável  colecaoService para usar o serviço ColecaoService.
  let colecaoRepositoryMock: ColecaoRepositoryInterface; // Mock para simular o repositório de coleções.

 
  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock(); // Cria uma instância do mock de coleções.
    colecaoService = new ColecaoService(colecaoRepositoryMock); // Cria uma instância do ColecaoService, passando o mock 
  });

  
  afterEach(() => {
    jest.resetAllMocks(); // Reseta todos os mocks 
  });


  describe('findAll', () => {
    // Testa se o método findAll retorna todos os objetos ColecaoEntity.
    it('should return all ColecaoEntity objects', async () => {
      const result = await colecaoService.findAll(); // Chama o método findAll do ColecaoService.
      expect(result).toEqual(ManyColecaoFixture); // Verifica se o resultado é igual ao objeto esperado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled(); // Verifica se o método findAll de coleções foi chamado.
    });

    it('should call the repository with the specified title', async () => {
      await colecaoService.findAll('titulo'); // Chama o método findAll do  ColecaoService com o argumento 'titulo'.
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo'); // Verifica se o método findAll de coleções foi chamado com o 'titulo'.
    });
  });


  describe('findById', () => {
    
    it('should return the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.findById(1); // Chama o método findById do ColecaoService com o argumento 1.
      expect(result).toEqual(OneColecaoFixture); // Verifica se o resultado é igual ao objeto esperado
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Verifica se o método findById de coleções foi chamado com o argumento 1.
    });

   
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);  

      await expect(colecaoService.findById(1)).rejects.toThrow(AppError); // Verifica se a chamada de findById com o argumento 1 lança um erro do tipo AppError.
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Verifica se o método findById do repositório de coleções foi chamado com o argumento 1.
    });
  });

  
  describe('create', () => {
    it('should create a new ColecaoEntity object', async () => {
      const result = await colecaoService.create(ColecaoInterfaceFixture); // Chama o método create ColecaoService .
      expect(result).toEqual(CreatedColecaoFixture); // Verifica se o resultado é igual ao objeto esperado
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined }); // Verifica se o método create de coleções foi chamado com os argumentos corretos.
    });
  });


  describe('update', () => {
    // Testa se o método update atualiza o objeto ColecaoEntity com o ID especificado.
    it('should update the ColecaoEntity object with the specified ID', async () => {
      const result = await colecaoService.update(1, ColecaoInterfaceFixture); // Chama o método update do  ColecaoService com os argumentos 1 

      expect(result).toEqual(OneColecaoFixture); // Verifica se o resultado é igual ao objeto esperado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Verifica se o método getColecaoOnly de coleções foi chamado com o argumento 1.
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture }); // Verifica se o método update  de coleções foi chamado com os argumentos corretos.
    });

    // Testa se o método update lança um erro caso o objeto ColecaoEntity com o ID especificado não seja encontrado.
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null); // Simula que o método getColecaoOnly do repositório de coleções retorna null.
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError); // Verifica se a chamada de update com os argumentos 1 lança um erro do tipo AppError.
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); // Verifica se o método getColecaoOnly de coleções foi chamado com o argumento 1.
    });
  });


  describe('delete', () => {
    // Testa se o método delete deleta o objeto ColecaoEntity com o ID especificado.
    it('should delete the ColecaoEntity object with the specified ID', async () => {
      await colecaoService.delete(1); 
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); 
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1); 
    });

    // Testa se o método delete lança um erro caso o objeto ColecaoEntity com o ID especificado não seja encontrado.
    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null); 
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError); 
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1); 
    });
  });
});

