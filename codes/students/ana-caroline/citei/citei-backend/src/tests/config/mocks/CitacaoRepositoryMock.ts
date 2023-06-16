import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture } from "../fixtures/CitacaoFixtures";

//mock é um objeto simulado que imita o comportamento de um objeto real durante os testes. Ele substitui as 
//dependências externas por objetos controlados, permitindo a execução de testes isolados e controlados da 
//lógica do código em questão.
export const CitacaoRepositoryMock = (): jest.Mocked<CitacaoRepositoryInterface> => {
  // Mock da implementação da interface do repositório de citações

  // Mock da função findAll, que retorna uma promessa resolvida com uma lista de citações
  return {
    findAll: jest.fn().mockResolvedValue(manyCitacoesFixture),

    // Mock da função findById, que retorna uma promessa resolvida com uma citação específica
    findById: jest.fn().mockResolvedValue(OneCitacaoFixture),

    // Mock da função create, que retorna uma promessa resolvida com a citação criada
    create: jest.fn().mockResolvedValue(OneCitacaoFixture),

    // Mock da função update, que retorna uma promessa resolvida com a citação atualizada
    update: jest.fn().mockResolvedValue(OneCitacaoFixture),

    // Mock da função delete, que não retorna um valor (undefined)
    delete: jest.fn(),

    // Mock da função getCitacaoOnly, que retorna uma promessa resolvida com uma citação específica (apenas com o texto da citação)
    getCitacaoOnly: jest.fn().mockResolvedValue(OneCitacaoOnlyFixture),
  } as jest.Mocked<CitacaoRepositoryInterface>;
};





