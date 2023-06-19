// Importa a entidade CitacaoEntity do diretório "../../../app/entities/CitacaoEntity"
import CitacaoEntity from '../../../app/entities/CitacaoEntity';

// Define uma constante chamada manyCitacoesFixture que é um array de objetos CitacaoEntity
export const manyCitacoesFixture: CitacaoEntity[] = [
  {
    id: 1,
    titulo: 'Citacao 1',
    id_colecao: 1,
    colecao: {
      id: 1,
      titulo: 'Colecao 1',
      imagem: 'imagem',
      autor: 'autor',
      subtitulo: 'subtitulo',
    },
    created_at: new Date('2022-01-01'),
  },
  {
    id: 2,
    titulo: 'Citacao 2',
    id_colecao: 2,
    colecao: {
      id: 2,
      titulo: 'Colecao 2',
      imagem: 'imagem',
      autor: 'autor',
      subtitulo: 'subtitulo',
    },
    created_at: new Date('2022-01-01'),
  },
];

// Define uma constante chamada OneCitacaoFixture que é um objeto CitacaoEntity
export const OneCitacaoFixture: CitacaoEntity = {
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  colecao: {
    id: 1,
    titulo: 'Colecao 1',
    imagem: 'imagem',
    autor: 'autor',
    subtitulo: 'subtitulo',
  },
  created_at: new Date('2022-01-01'),
};

// Define uma constante chamada newCitacaoFixture que é um objeto CitacaoEntity
export const newCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Define uma constante chamada updateCitacaoFixture que é um objeto CitacaoEntity
export const updateCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Define uma constante chamada OneCitacaoOnlyFixture que é um objeto CitacaoEntity
export const OneCitacaoOnlyFixture: CitacaoEntity = {
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  created_at: new Date('2022-01-01'),
};
