import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import { CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../fixtures/ColecaoFixture";


//mock é um objeto simulado que imita o comportamento de um objeto real durante os testes. Ele substitui as 
//dependências externas por objetos controlados, permitindo a execução de testes isolados e controlados da 
//lógica do código em questão.
export const ColecaoRepositoryMock = (): jest.Mocked<ColecaoRepositoryInterface> => {
  // Mock da implementação da interface do repositório de coleções

  // Mock da função findAll, que retorna uma promessa resolvida com uma lista de coleções
  return {
    findAll: jest.fn().mockResolvedValue(ManyColecaoFixture),

    // Mock da função findById, que retorna uma promessa resolvida com uma coleção específica
    findById: jest.fn().mockResolvedValue(OneColecaoFixture),

    // Mock da função create, que retorna uma promessa resolvida com a coleção criada
    create: jest.fn().mockResolvedValue(CreatedColecaoFixture),

    // Mock da função update, que retorna uma promessa resolvida com a coleção atualizada
    update: jest.fn().mockResolvedValue(OneColecaoFixture),

    // Mock da função delete, que não retorna um valor (undefined)
    delete: jest.fn(),

    // Mock da função getColecaoOnly, que retorna uma promessa resolvida com uma coleção específica
    // (possivelmente contendo apenas informações básicas da coleção)
    getColecaoOnly: jest.fn().mockResolvedValue(OneColecaoFixture),
  } as jest.Mocked<ColecaoRepositoryInterface>;
};