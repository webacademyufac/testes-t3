import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import { CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../fixtures/ColecaoFixture";

// Implementa um mock do repositório de coleções que implementa a interface ColecaoRepositoryInterface
export const ColecaoRepositoryMock = (): jest.Mocked<ColecaoRepositoryInterface> => {
  return {
    // Simula a função findAll() do repositório que retorna várias coleções
    findAll: jest.fn().mockResolvedValue(ManyColecaoFixture),

    // Simula a função findById() do repositório que retorna uma única coleção
    findById: jest.fn().mockResolvedValue(OneColecaoFixture),

    // Simula a função create() do repositório que cria uma coleção
    create: jest.fn().mockResolvedValue(CreatedColecaoFixture),

    // Simula a função update() do repositório que atualiza uma coleção
    update: jest.fn().mockResolvedValue(OneColecaoFixture),

    // Simula a função delete() do repositório que exclui uma coleção
    delete: jest.fn(),

    // Simula a função getColecaoOnly() do repositório que retorna uma única coleção específica
    getColecaoOnly: jest.fn().mockResolvedValue(OneColecaoFixture),
  } as jest.Mocked<ColecaoRepositoryInterface>;
};
