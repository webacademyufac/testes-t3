import { faker } from "@faker-js/faker";
import { IQuotation } from "src/interfaces/quotation";

export function quotation(initial?: Partial<IQuotation>): IQuotation {
  // Retorna um objeto que representa uma citação
  // Os valores iniciais podem ser fornecidos como um objeto parcial através do parâmetro `initial`

  // Definindo as propriedades padrão da citação
  const defaultQuotation: IQuotation = {
    quote: faker.word.words(10), // Gera uma citação fictícia com 10 palavras
    author: faker.person.fullName(), // Gera um nome fictício de autor
    collection: faker.word.words(2), // Gera um nome fictício de coleção
  };

  // Mesclando as propriedades padrão com as propriedades iniciais fornecidas como argumento
  const mergedQuotation: IQuotation = {
    ...defaultQuotation,
    ...initial,
  };

  // Retornando a citação resultante
  return mergedQuotation;
}
