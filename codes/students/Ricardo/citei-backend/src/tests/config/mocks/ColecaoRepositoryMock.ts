import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import { CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../fixtures/ColecaoFixture";

// Uma espécie de simulador de uma entidade, nesse caso, simula o repositório de coleção, com todas as funções padrão de um repository
// Utilizado para testes de unidade e de integração
export const ColecaoRepositoryMock = (): jest.Mocked<ColecaoRepositoryInterface> => {
  return {
    findAll: jest.fn().mockResolvedValue(ManyColecaoFixture),
    findById: jest.fn().mockResolvedValue(OneColecaoFixture),
    create: jest.fn().mockResolvedValue(CreatedColecaoFixture),
    update: jest.fn().mockResolvedValue(OneColecaoFixture),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(OneColecaoFixture),
  } as jest.Mocked<ColecaoRepositoryInterface>;
};