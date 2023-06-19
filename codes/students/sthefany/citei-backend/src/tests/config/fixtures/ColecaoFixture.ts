// Importa a entidade ColecaoEntity do local específico
import ColecaoEntity from "../../../app/entities/ColecaoEntity";
// Importa a interface ColecaoInterface do local específico
import ColecaoInterface from "../../../app/interfaces/entities/ColecaoInterface";

// Fixture para uma única coleção
export const OneColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}

// Fixture para várias coleções
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

// Fixture para uma interface de coleção
export const ColecaoInterfaceFixture: ColecaoInterface = {
  titulo: 'titulo',
  autor: 'autor',
  imagem: 'imagem',
  subtitulo: 'subtitulo',
}

// Fixture para uma coleção criada
export const CreatedColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}
