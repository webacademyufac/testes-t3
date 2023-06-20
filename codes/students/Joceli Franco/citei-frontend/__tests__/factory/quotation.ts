import { faker } from "@faker-js/faker";
import { IQuotation } from "src/interfaces/quoatation";

//Essa função possibilita a geração de valores aleatórios para testes ou a criação
//de um objeto que represente uma citação em uma aplicação.
export function quotation(initial?: Partial<IQuotation>): IQuotation {
  return {
    quote: faker.word.words(10),
    author: faker.person.fullName(),
    collection: faker.word.words(2),
    ...initial,
  }
}
