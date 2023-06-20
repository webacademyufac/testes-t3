import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture } from "../fixtures/CitacaoFixtures";

// Implementa um mock do repositório de citações que implementa a interface CitacaoRepositoryInterface
export const CitacaoRepositoryMock = (): jest.Mocked<CitacaoRepositoryInterface> => {
  return {
    // Simula a função findAll() do repositório que retorna várias citações
    findAll: jest.fn().mockResolvedValue(manyCitacoesFixture),

    // Simula a função findById() do repositório que retorna uma única citação
    findById: jest.fn().mockResolvedValue(OneCitacaoFixture),

    // Simula a função create() do repositório que cria uma citação
    create: jest.fn().mockResolvedValue(OneCitacaoFixture),

    // Simula a função update() do repositório que atualiza uma citação
    update: jest.fn().mockResolvedValue(OneCitacaoFixture),

    // Simula a função delete() do repositório que exclui uma citação
    delete: jest.fn(),

    // Simula a função getCitacaoOnly() do repositório que retorna uma única citação específica
    getCitacaoOnly: jest.fn().mockResolvedValue(OneCitacaoOnlyFixture),
  } as jest.Mocked<CitacaoRepositoryInterface>;
};
