import CitacaoEntity from '../../../app/entities/CitacaoEntity';

// Define uma array de várias citações (dados simulados)
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

// Define uma única citação (dados simulados)
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

// Define uma nova citação (dados simulados)
export const newCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Define uma citação atualizada (dados simulados)
export const updateCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Define uma única citação sem informações completas (dados simulados)
export const OneCitacaoOnlyFixture: CitacaoEntity = {
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  created_at: new Date('2022-01-01'),
};
