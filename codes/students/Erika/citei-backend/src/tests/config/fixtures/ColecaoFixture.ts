import ColecaoEntity from "../../../app/entities/ColecaoEntity";
import ColecaoInterface from "../../../app/interfaces/entities/ColecaoInterface";

// Define uma única coleção (dados simulados)
export const OneColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
};

// Define várias coleções (dados simulados)
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
];

// Define uma interface de coleção (dados simulados)
export const ColecaoInterfaceFixture: ColecaoInterface = {
  titulo: 'titulo',
  autor: 'autor',
  imagem: 'imagem',
  subtitulo: 'subtitulo',
};

// Define uma coleção criada (dados simulados)
export const CreatedColecaoFixture: ColecaoEntity = {
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
};
