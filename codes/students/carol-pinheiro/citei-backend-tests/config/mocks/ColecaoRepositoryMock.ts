import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import { CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../fixtures/ColecaoFixture";
//acima também dá pra perceber que tem um retorno de um objeto que implementa uma interface só que nesse caso é sobre Colecao

export const ColecaoRepositoryMock = (): jest.Mocked<ColecaoRepositoryInterface> => {
  return {
    findAll: jest.fn().mockResolvedValue(ManyColecaoFixture),//pude perceber que esses metodos sao parecidos com os que foram usados em citacaorepository
    findById: jest.fn().mockResolvedValue(OneColecaoFixture),
    create: jest.fn().mockResolvedValue(CreatedColecaoFixture),
    update: jest.fn().mockResolvedValue(OneColecaoFixture),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(OneColecaoFixture),
  } as jest.Mocked<ColecaoRepositoryInterface>;
};