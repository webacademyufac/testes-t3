// Importa a interface ColecaoRepositoryInterface do diretório "../../../app/interfaces/repositories/ColecaoRepositoryInterface"
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
// Importa as constantes CreatedColecaoFixture, ManyColecaoFixture e OneColecaoFixture do diretório "../fixtures/ColecaoFixture"
import { CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../fixtures/ColecaoFixture";

// Define uma função chamada ColecaoRepositoryMock que retorna um objeto do tipo jest.Mocked<ColecaoRepositoryInterface>
export const ColecaoRepositoryMock = (): jest.Mocked<ColecaoRepositoryInterface> => {
  return {
    // Mock da função findAll que retorna uma promessa resolvida com ManyColecaoFixture
    findAll: jest.fn().mockResolvedValue(ManyColecaoFixture),
    // Mock da função findById que retorna uma promessa resolvida com OneColecaoFixture
    findById: jest.fn().mockResolvedValue(OneColecaoFixture),
    // Mock da função create que retorna uma promessa resolvida com CreatedColecaoFixture
    create: jest.fn().mockResolvedValue(CreatedColecaoFixture),
    // Mock da função update que retorna uma promessa resolvida com OneColecaoFixture
    update: jest.fn().mockResolvedValue(OneColecaoFixture),
    // Mock da função delete que não retorna um valor
    delete: jest.fn(),
    // Mock da função getColecaoOnly que retorna uma promessa resolvida com OneColecaoFixture
    getColecaoOnly: jest.fn().mockResolvedValue(OneColecaoFixture),
  } as jest.Mocked<ColecaoRepositoryInterface>;
};
