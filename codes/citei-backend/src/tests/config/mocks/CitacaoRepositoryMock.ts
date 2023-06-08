import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture } from "../fixtures/CitacaoFixtures";


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
