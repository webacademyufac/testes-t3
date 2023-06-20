import { ICollectionService } from "../../src/service/collection";
import { collection } from "./collection";

// Função para criar um objeto de serviço de coleção com valores padrão
export function collectionService(initial?: Partial<ICollectionService>): ICollectionService {
  return {
    // Implementação de uma função que retorna uma Promise vazia para obter coleções válidas
    getValidCollections: () => Promise.resolve([]),
    // Implementação de uma função que filtra coleções
    filterCollections: (_, collections) => collections,
    // Implementação de uma função que verifica se uma coleção é válida
    isValidCollection: (_) => true,
    // Implementação de uma função que salva uma coleção, retornando uma Promise vazia e gerando uma coleção aleatória
    saveCollection: (_) => Promise.resolve(collection()),
    // Combinando os valores iniciais fornecidos com os valores padrão gerados
    ...initial,
  };
}
