import { faker } from "@faker-js/faker";
import { IQuotation } from "src/interfaces/quoatation";

// Exporta a função quotation
export function quotation(initial?: Partial<IQuotation>): IQuotation {
  // A função `quotation` retorna um objeto `IQuotation`

  // Define as propriedades do objeto
  return {
    // A propriedade `quote` recebe uma frase de 10 palavras gerada aleatoriamente pelo faker
    quote: faker.word.words(10),

    // A propriedade `author` recebe um nome de pessoa gerado aleatoriamente pelo faker
    author: faker.person.fullName(),

    // A propriedade `collection` recebe um conjunto de duas palavras geradas aleatoriamente pelo faker
    collection: faker.word.words(2),

    // A propriedade `initial` permite a passagem de valores iniciais para sobrescrever as propriedades acima (opcional)
    ...initial,
  };
}
