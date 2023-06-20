import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture } from "../fixtures/CitacaoFixtures";
//acima tem o retorno de um objeto que está implementando uma interface que é o CitacaoRepositoryInterface


export const CitacaoRepositoryMock = (): jest.Mocked<CitacaoRepositoryInterface> => {
  return {
    findAll: jest.fn().mockResolvedValue(manyCitacoesFixture), 
    findById: jest.fn().mockResolvedValue(OneCitacaoFixture),
    create: jest.fn().mockResolvedValue(OneCitacaoFixture),
    update: jest.fn().mockResolvedValue(OneCitacaoFixture),
    delete: jest.fn(),
    getCitacaoOnly: jest.fn().mockResolvedValue(OneCitacaoOnlyFixture),
  } as jest.Mocked<CitacaoRepositoryInterface>;
}; //o CitacaoRepositoryMock está usando métodos como o findAll e findById 

//o mock está representando operações de banco de dados sem implementar operações de verdade, cria um ambiente de teste