import { faker } from "@faker-js/faker";
import { ImageURL } from "../../src/entities/url";
import { ICollection } from "../../src/interfaces/collection";

export function collection(initial?: Partial<ICollection>): ICollection {
  // Gerando valores aleatórios para criar uma coleção
  const defaultValues: ICollection = {
    title: faker.word.words(2),
    author: faker.person.fullName(),
    subtitle: faker.word.words(7),
    image: new ImageURL(`${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`),
  };

  // Mesclando os valores padrão com os valores iniciais fornecidos como argumento
  const mergedValues: ICollection = {
    ...defaultValues,
    ...initial,
  };

  // Retornando a coleção resultante
  return mergedValues;
}
