import ColecaoEntity from "../../../app/entities/ColecaoEntity";
import ColecaoInterface from "../../../app/interfaces/entities/ColecaoInterface";

export const OneColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}

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

export const ColecaoInterfaceFixture: ColecaoInterface = {
  titulo: 'titulo',
  autor: 'autor',
  imagem: 'imagem',
  subtitulo: 'subtitulo',
}

export const CreatedColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}
