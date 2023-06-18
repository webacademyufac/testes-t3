import { AppError } from "../../../app/Errors/AppError";
import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import CitacaoService from "../../../app/services/CitacaoService";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture, newCitacaoFixture } from "../../config/fixtures/CitacaoFixtures";
import { CitacaoRepositoryMock } from "../../config/mocks/CitacaoRepositoryMock";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";


describe('CitacaoService', () => {
  let citacaoService: CitacaoService; // Declaração da variável citacaoService que será usada para testar o serviço CitacaoService.
  let citacaoRepositoryMock: CitacaoRepositoryInterface; // Mock que será usada para simular o repositório de citações.
  let colecaoRepositoryMock: ColecaoRepositoryInterface; // Mock que será usada para simular o repositório de coleções.

  beforeEach(() => {
    citacaoRepositoryMock = CitacaoRepositoryMock(); // Cria um mock  citações.
    colecaoRepositoryMock = ColecaoRepositoryMock(); // Cria um mock  coleções.
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock); // Cria uma instância do serviço CitacaoService usando os mocks 
  });

  afterEach(() => {
    jest.resetAllMocks(); // Reseta os mocks depois de cada teste.
  });

  describe('findAll', () => {
    it('should return all CitacaoEntity objects', async () => {
      const result = await citacaoService.findAll();

      expect(result).toEqual(manyCitacoesFixture); // Verifica se o resultado é igual à fixture de várias citações.
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled(); // Verifica se o método `findAll`  de citações foi chamado.
    });

    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao';
      const result = await citacaoService.findAll(titulo);
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo); // Verifica se o método `findAll` de citações foi chamado com 'titulo'.
    })
  });


});