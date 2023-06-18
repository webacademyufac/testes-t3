//Está sendo importada uma classe chamada ColecaoEntity do arquivo ColecaoEntity.js que está localizado no diretório app/entities
//Está sendo importada uma interface chamada ColecaoInterface do arquivo ColecaoInterface.js que está localizado no diretório app/interfaces/entities

import ColecaoEntity from "../../../app/entities/ColecaoEntity";                    
import ColecaoInterface from "../../../app/interfaces/entities/ColecaoInterface";   

//Exportação de uma constante chamada OneColecaoFixture, que é um objeto do tipo ColecaoEntity, o objeto OneColecaoFixture com algumas propriedades
//usada para fornecer um exemplo ou um conjunto de dados de teste para a entidade ColecaoEntity

export const OneColecaoFixture: ColecaoEntity = {    
  id: 1,                                             
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}

//Essa exportação é usada para fornecer exemplos ou um conjunto de dados de teste para lista de ColecaoEntity
 // O array ManyColecaoFixture pode ser usado em outras partes do código para simular uma coleção de entidades ColecaoEntity com valores predefinidos

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

//Essa estrutura permite usar esse objeto como um exemplo de como as entidades ou objetos que implementam a interface ColecaoInterface devem ser estruturados

export const ColecaoInterfaceFixture: ColecaoInterface = {   
  titulo: 'titulo',
  autor: 'autor',
  imagem: 'imagem',
  subtitulo: 'subtitulo',
}

//Essa exportação é usada para fornecer um exemplo ou um conjunto de dados simulando uma coleção criada de ColecaoEntity

export const CreatedColecaoFixture: ColecaoEntity = {       
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}
