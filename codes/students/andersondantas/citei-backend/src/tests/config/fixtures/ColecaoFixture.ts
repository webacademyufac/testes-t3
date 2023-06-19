// Importa a entidade ColecaoEntity do diretório "../../../app/entities/ColecaoEntity"
import ColecaoEntity from "../../../app/entities/ColecaoEntity";
// Importa a interface ColecaoInterface do diretório "../../../app/interfaces/entities/ColecaoInterface"
import ColecaoInterface from "../../../app/interfaces/entities/ColecaoInterface";

// Define uma constante chamada OneColecaoFixture que é um objeto ColecaoEntity
export const OneColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}

// Define uma constante chamada ManyColecaoFixture que é um array de objetos ColecaoEntity
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

// Define uma constante chamada ColecaoInterfaceFixture que é um objeto ColecaoInterface
export const ColecaoInterfaceFixture: ColecaoInterface = {
  titulo: 'titulo',
  autor: 'autor',
  imagem: 'imagem',
  subtitulo: 'subtitulo',
}

// Define uma constante chamada CreatedColecaoFixture que é um objeto ColecaoEntity
export const CreatedColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}
