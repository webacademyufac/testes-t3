import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture } from "../fixtures/CitacaoFixtures";

// Uma espécie de simulador de uma entidade, nesse caso, simula o repositório de citação, com todas as funções padrão de um repository
// Utilizado para testes de unidade e de integração
export const CitacaoRepositoryMock = (): jest.Mocked<CitacaoRepositoryInterface> => {
  return {
    findAll: jest.fn().mockResolvedValue(manyCitacoesFixture),
    findById: jest.fn().mockResolvedValue(OneCitacaoFixture),
    create: jest.fn().mockResolvedValue(OneCitacaoFixture),
    update: jest.fn().mockResolvedValue(OneCitacaoFixture),
    delete: jest.fn(),
    getCitacaoOnly: jest.fn().mockResolvedValue(OneCitacaoOnlyFixture),
  } as jest.Mocked<CitacaoRepositoryInterface>;
};
