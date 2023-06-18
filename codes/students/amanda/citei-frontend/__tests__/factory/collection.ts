import { faker } from "@faker-js/faker";
import { ImageURL } from "../../src/entities/url";
import { ICollection } from "../../src/interfaces/collection";

// Essa função pode ser usada para gerar valores aleatórios para teste ou para criar um objeto que representa uma coleção em uma aplicação

export function collection(initial?: Partial<ICollection>): ICollection {
  return {
    title: faker.word.words(2),
    author: faker.person.fullName(),
    subtitle: faker.word.words(7),
    image: new ImageURL(`${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`),
    ...initial,
  }
}
