import { ICollectionService } from "../../src/service/collection";
import { collection } from "./collection";

// Essa função pode ser usada para gerar um objeto que representa um serviço de coleções com funções padrão que podem ser substituídas através do parâmetro inicial

export function collectionService(initial?: Partial<ICollectionService>): ICollectionService {
  return {
    getValidCollections: () => Promise.resolve([]),
    filterCollections: (_, collections) => collections,
    isValidCollection: (_) => true,
    saveCollection: (_) => Promise.resolve(collection()),
    ...initial,
  }
}
