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

  // Cria uma nova instância do serviço e do repositório antes de cada teste
  beforeEach(() => {
    citacaoRepositoryMock = CitacaoRepositoryMock();
    colecaoRepositoryMock = ColecaoRepositoryMock();
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  // Reseta os mocks após cada teste
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all CitacaoEntity objects', async () => {
      const result = await citacaoService.findAll(); // Chama o método findAll do serviço

      expect(result).toEqual(manyCitacoesFixture); // Espera que o resultado seja o mock de muitas citações
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled(); // Espera que o método findAll do repositório tenha sido chamado
    });

    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao'; // Define um título para a citação
      const result = await citacaoService.findAll(titulo); // Chama o método findAll do serviço
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo); // Espera que o método findAll do repositório tenha sido chamado com os mesmos parâmetros
    })
  });

  describe('findById', () => {
    it('should return the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.findById(1); // Chama o método findById do serviço

      expect(result).toEqual(OneCitacaoFixture); // Espera que o resultado seja o mock de uma citação
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Espera que o método findById do repositório tenha sido chamado com o mesmo ID
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null); // Faz o mock do método findById do repositório para retornar null

      await expect(citacaoService.findById(1)).rejects.toThrow(AppError); // Espera que o método findById do serviço retorne um erro
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1); // Espera que o método findById do repositório tenha sido chamado com o mesmo ID
    });
  });

  describe('create', () => {
    it('should create a new CitacaoEntity object', async () => {
      const result = await citacaoService.create(newCitacaoFixture); // Chama o método create do serviço

      expect(result).toEqual(OneCitacaoFixture); // Espera que o resultado seja o mock de uma citação
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture); // Espera que o método create do repositório tenha sido chamado com os mesmos parâmetros
    });
  });

  describe('update', () => {
    it('should update the CitacaoEntity object with the specified ID', async () => {
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 }); // Chama o método update do serviço

      expect(result).toEqual(OneCitacaoFixture); // Espera que o resultado seja o mock de uma citação
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1); // Espera que o método getCitacaoOnly do repositório tenha sido chamado com o mesmo ID
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2); // Espera que o método getColecaoOnly do repositório tenha sido chamado com o mesmo ID
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao'}); // Espera que o método update do repositório tenha sido chamado com os mesmos parâmetros
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null); // Faz o mock do método getColecaoOnly do repositório para retornar null

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError); // Espera que o método update do serviço retorne um erro
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2); // Espera que o método getColecaoOnly do repositório tenha sido chamado com o mesmo ID
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null); // Faz o mock do método getCitacaoOnly do repositório para retornar null

      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError); // Espera que o método update do serviço retorne um erro
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1); // Espera que o método getCitacaoOnly do repositório tenha sido chamado com o mesmo ID
    });
  });

  describe('delete', () => {
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      await citacaoService.delete(1); // Chama o método delete do serviço
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1); // Espera que o método getCitacaoOnly do repositório tenha sido chamado com o mesmo ID
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1); // Espera que o método delete do repositório tenha sido chamado com o mesmo ID
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null); // Faz o mock do método getCitacaoOnly do repositório para retornar null

      await expect(citacaoService.delete(1)).rejects.toThrow(AppError); // Espera que o método delete do serviço retorne um erro
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1); // Espera que o método getCitacaoOnly do repositório tenha sido chamado com o mesmo ID
    });
  });
});
