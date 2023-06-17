import { faker } from "@faker-js/faker";
import { ImageURL } from "../../src/entities/url";
import { ICollection } from "../../src/interfaces/collection"; //

export function collection(initial?: Partial<ICollection>): ICollection {
  return {
    title: faker.word.words(2),// title recebe um valor aleatório gerado pelo faker.word.words(2)
    author: faker.person.fullName(),//faker.person.fullName(), que gera um nome completo aleatório
    subtitle: faker.word.words(7),// faker.word.words(7), gera sete palavras aleatórias
    image: new ImageURL(`${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`),//image recebe um novo objeto ImageURL criado usando o construtor ImageURL 
    ...initial,
  }
}
