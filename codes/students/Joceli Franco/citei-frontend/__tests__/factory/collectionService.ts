import { ICollectionService } from "../../src/service/collection";
import { collection } from "./collection";

//Essa função cria um objeto que encapsula um serviço de coleções, 
//fornecendo funções padrão que podem ser sobrescritas através do parâmetro inicial.
export function collectionService(initial?: Partial<ICollectionService>): ICollectionService {
  return {
    getValidCollections: () => Promise.resolve([]),
    filterCollections: (_, collections) => collections,
    isValidCollection: (_) => true,
    saveCollection: (_) => Promise.resolve(collection()),
    ...initial,
  }
}
