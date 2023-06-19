import { ICollectionService } from "../../src/service/collection";
import { collection } from "./collection";

// Exporta a função collectionService
export function collectionService(initial?: Partial<ICollectionService>): ICollectionService {
  // A função `collectionService` retorna um objeto `ICollectionService`

  // Define as propriedades e métodos do objeto
  return {
    // O método `getValidCollections` retorna uma Promise que resolve com um array vazio
    getValidCollections: () => Promise.resolve([]),

    // O método `filterCollections` recebe dois parâmetros (ignorados) e retorna as coleções recebidas como argumento
    filterCollections: (_, collections) => collections,

    // O método `isValidCollection` recebe uma coleção como argumento e retorna true
    isValidCollection: (_) => true,

    // O método `saveCollection` recebe uma coleção como argumento e retorna uma Promise que resolve com um novo objeto de coleção gerado pela função `collection()`
    saveCollection: (_) => Promise.resolve(collection()),

    // A propriedade `initial` permite a passagem de valores iniciais para sobrescrever as propriedades e métodos acima (opcional)
    ...initial,
  }
}
