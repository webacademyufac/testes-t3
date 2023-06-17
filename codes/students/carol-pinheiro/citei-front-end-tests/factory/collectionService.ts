import { ICollectionService } from "../../src/service/collection";
import { collection } from "./collection";

export function collectionService(initial?: Partial<ICollectionService>): ICollectionService {//collectionService retorna um objeto que representa um serviço de coleção
  return {
    getValidCollections: () => Promise.resolve([]),//O getValidCollections é uma função que retorna uma promessa resolvida com uma matriz vazia ([])
    filterCollections: (_, collections) => collections,//filterCollections retorna coleções sem fazer modificações 
    isValidCollection: (_) => true,//essa eu achei bem interessante que a isValidCollection retorna true
    saveCollection: (_) => Promise.resolve(collection()),//A saveCollection retorna uma promessa resolvida com um objeto de coleção gerado pela função collection()
    ...initial,
  }
}
