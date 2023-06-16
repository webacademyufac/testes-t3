import { ICollectionService } from "../../src/service/collection";
import { collection } from "./collection";

export function collectionService(initial?: Partial<ICollectionService>): ICollectionService {
  // Definindo implementações padrão para os métodos do serviço de coleção
  const defaultImplementations: ICollectionService = {
    // Retorna uma Promise vazia, indicando que não há coleções válidas
    getValidCollections: () => Promise.resolve([]),
    // Filtra as coleções com base em um critério não especificado (provavelmente ignorando o critério)
    filterCollections: (_, collections) => collections,
    // Sempre retorna verdadeiro, indicando que uma coleção é válida
    isValidCollection: (_) => true,
    // Salva uma coleção (gerando uma nova coleção usando a função `collection` definida anteriormente)
    saveCollection: (_) => Promise.resolve(collection()),
  };

  // Mesclando as implementações padrão com as implementações iniciais fornecidas como argumento
  const mergedImplementations: ICollectionService = {
    ...defaultImplementations,
    ...initial,
  };

  // Retornando o serviço de coleção resultante
  return mergedImplementations;
}
