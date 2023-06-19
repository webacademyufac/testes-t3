import CitacaoEntity from '../../../app/entities/CitacaoEntity';

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

export const newCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};


export const updateCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

export const OneCitacaoOnlyFixture: CitacaoEntity = {
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  created_at: new Date('2022-01-01'),
};
