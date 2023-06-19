import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import { CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../fixtures/ColecaoFixture";

export const ColecaoRepositoryMock = (): jest.Mocked<ColecaoRepositoryInterface> => {/*mock serve para silmular as classes repository
em nossos testes unitários, queremos isolar um componente, mas esse componente precisa acessar o banco de dados para funcionar, então,
criamos uma simulacao do banco de dados, o coponente vai pensar que está acessando o banco, mas não estará. */
  return {//returna os métodos básicos, de acordo com os que temos na terface colecaoRepository
    findAll: jest.fn().mockResolvedValue(ManyColecaoFixture),
    findById: jest.fn().mockResolvedValue(OneColecaoFixture),
    create: jest.fn().mockResolvedValue(CreatedColecaoFixture),
    update: jest.fn().mockResolvedValue(OneColecaoFixture),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(OneColecaoFixture),
  } as jest.Mocked<ColecaoRepositoryInterface>;
};