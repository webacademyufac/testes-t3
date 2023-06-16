// Importa a interface CitacaoRepositoryInterface do diretório "../../../app/interfaces/repositories/CitacaoRepositoryInterface"
import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
// Importa as constantes OneCitacaoFixture, OneCitacaoOnlyFixture e manyCitacoesFixture do diretório "../fixtures/CitacaoFixtures"
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture } from "../fixtures/CitacaoFixtures";

// Define uma função chamada CitacaoRepositoryMock que retorna um objeto do tipo jest.Mocked<CitacaoRepositoryInterface>
export const CitacaoRepositoryMock = (): jest.Mocked<CitacaoRepositoryInterface> => {
  return {
    // Mock da função findAll que retorna uma promessa resolvida com manyCitacoesFixture
    findAll: jest.fn().mockResolvedValue(manyCitacoesFixture),
    // Mock da função findById que retorna uma promessa resolvida com OneCitacaoFixture
    findById: jest.fn().mockResolvedValue(OneCitacaoFixture),
    // Mock da função create que retorna uma promessa resolvida com OneCitacaoFixture
    create: jest.fn().mockResolvedValue(OneCitacaoFixture),
    // Mock da função update que retorna uma promessa resolvida com OneCitacaoFixture
    update: jest.fn().mockResolvedValue(OneCitacaoFixture),
    // Mock da função delete que não retorna um valor
    delete: jest.fn(),
    // Mock da função getCitacaoOnly que retorna uma promessa resolvida com OneCitacaoOnlyFixture
    getCitacaoOnly: jest.fn().mockResolvedValue(OneCitacaoOnlyFixture),
  } as jest.Mocked<CitacaoRepositoryInterface>;
};
