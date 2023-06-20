import ColecaoEntity from "../../../app/entities/ColecaoEntity";
import ColecaoInterface from "../../../app/interfaces/entities/ColecaoInterface";

//A constante OneColecaoFixture é um objeto que contém informações fictícias
//usadas como exemplo ou conjunto de dados de teste para a entidade ColecaoEntity.
export const OneColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}


//Essa exportação fornece exemplos ou dados de teste para uma lista de entidades ColecaoEntity. 
//O array ManyColecaoFixture é usado em diferentes partes do código para simular uma coleção de 
//entidades ColecaoEntity com valores pré-definidos.
export const ManyColecaoFixture: ColecaoEntity[] = [
  {
    id: 1,
    titulo: 'titulo',
    subtitulo: 'subtitulo',
    autor: 'autor',
    imagem: 'imagem',
  },
  {
    id: 2,
    titulo: 'titulo',
    subtitulo: 'subtitulo',
    autor: 'autor',
    imagem: 'imagem',
  },
]

//Essa abordagem possibilita utilizar esse objeto como um modelo ou referência
// para entender como as entidades ou objetos que implementam a interface 
//ColecaoInterface devem ser organizados.
export const ColecaoInterfaceFixture: ColecaoInterface = {
  titulo: 'titulo',
  autor: 'autor',
  imagem: 'imagem',
  subtitulo: 'subtitulo',
}
//A finalidade dessa constante é fornecer um exemplo ou conjunto 
//de dados que simulam uma coleção de objetos do tipo ColecaoEntity.
export const CreatedColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}
