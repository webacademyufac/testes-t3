import { faker } from "@faker-js/faker";
import { IQuotation } from "src/interfaces/quoatation";

export function quotation(initial?: Partial<IQuotation>): IQuotation {
  return {
    quote: faker.word.words(10),// quote é uma propriedade que armazena uma string gerada pelo faker e contém 10 palavras, essa string representa a citação em si.
    author: faker.person.fullName(),//author é uma propriedade que armazena uma string gerada pelo faker contendo um nome completo de uma pessoa, e essa string representa o autor da citação.
    collection: faker.word.words(2),//collection é uma propriedade que armazena uma string gerada pelo faker contendo 2 palavras, e essa string representa o nome da coleção à qual a citação pertence.
    ...initial,
  }
}
