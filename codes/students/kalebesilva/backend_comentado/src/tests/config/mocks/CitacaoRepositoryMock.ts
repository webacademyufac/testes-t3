import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture } from "../fixtures/CitacaoFixtures";


export const CitacaoRepositoryMock = (): jest.Mocked<CitacaoRepositoryInterface> => { /*mock serve para silmular as classes repository
em nossos testes unitários, queremos isolar um componente, mas esse componente precisa acessar o banco de dados para funcionar, então,
criamos uma simulacao do banco de dados, o coponente vai pensar que está acessando o banco, mas não estará.
*/  
return {// retorna os métodos criados anteriormente pela interface de citacaoRepository
    findAll: jest.fn().mockResolvedValue(manyCitacoesFixture),
    findById: jest.fn().mockResolvedValue(OneCitacaoFixture),
    create: jest.fn().mockResolvedValue(OneCitacaoFixture),
    update: jest.fn().mockResolvedValue(OneCitacaoFixture),
    delete: jest.fn(),
    getCitacaoOnly: jest.fn().mockResolvedValue(OneCitacaoOnlyFixture),
  } as jest.Mocked<CitacaoRepositoryInterface>;
};
