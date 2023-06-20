import { faker } from "@faker-js/faker";
import { ImageURL } from "../../src/entities/url";
import { ICollection } from "../../src/interfaces/collection";

// Função para criar uma coleção com valores aleatórios
export function collection(initial?: Partial<ICollection>): ICollection {
  // Gerando valores aleatórios para a coleção
  return {
    // Gerando um título composto por 2 palavras aleatórias
    title: faker.word.words(2),
    // Gerando o nome do autor aleatoriamente
    author: faker.person.fullName(),
    // Gerando um subtítulo composto por 7 palavras aleatórias
    subtitle: faker.word.words(7),
    // Criando uma nova instância de ImageURL com a URL da imagem da coleção
    image: new ImageURL(`${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`),
    // Combinando os valores iniciais fornecidos com os valores padrão gerados
    ...initial,
  };
}
