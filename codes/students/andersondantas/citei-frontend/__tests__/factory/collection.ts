import { faker } from "@faker-js/faker";
import { ImageURL } from "../../src/entities/url";
import { ICollection } from "../../src/interfaces/collection";

// Exporta a função collection
export function collection(initial?: Partial<ICollection>): ICollection {
  // A função `collection` retorna um objeto `ICollection`

  // Define as propriedades do objeto
  return {
    // A propriedade `title` recebe duas palavras geradas aleatoriamente pelo faker
    title: faker.word.words(2),

    // A propriedade `author` recebe um nome de pessoa gerado aleatoriamente pelo faker
    author: faker.person.fullName(),

    // A propriedade `subtitle` recebe uma frase de 7 palavras gerada aleatoriamente pelo faker
    subtitle: faker.word.words(7),

    // A propriedade `image` recebe uma nova instância de ImageURL com uma URL específica
    image: new ImageURL(`${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`),

    // A propriedade `initial` permite a passagem de valores iniciais para sobrescrever as propriedades acima (opcional)
    ...initial,
  };
}
