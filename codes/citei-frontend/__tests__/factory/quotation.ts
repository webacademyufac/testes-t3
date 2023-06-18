import { faker } from "@faker-js/faker";
import { IQuotation } from "src/interfaces/quoatation";

//Essa função pode ser usada para gerar valores aleatórios para teste ou para criar um objeto que representa uma citação em uma aplicação

export function quotation(initial?: Partial<IQuotation>): IQuotation {
  return {
    quote: faker.word.words(10),
    author: faker.person.fullName(),
    collection: faker.word.words(2),
    ...initial,
  }
}
