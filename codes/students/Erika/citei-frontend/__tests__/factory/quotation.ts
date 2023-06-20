import { faker } from "@faker-js/faker";
import { IQuotation } from "src/interfaces/quoatation";

// Função para criar uma citação com valores aleatórios
export function quotation(initial?: Partial<IQuotation>): IQuotation {
  // Gerando valores aleatórios para a citação
  return {
    // Gerando uma citação com 10 palavras aleatórias
    quote: faker.word.words(10),
    // Gerando um nome de autor aleatório
    author: faker.person.fullName(),
    // Gerando uma coleção aleatória com 2 palavras
    collection: faker.word.words(2),
    // Combinando os valores iniciais fornecidos com os valores padrão gerados
    ...initial,
  };
}
