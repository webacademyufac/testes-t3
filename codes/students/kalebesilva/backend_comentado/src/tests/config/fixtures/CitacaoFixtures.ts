import CitacaoEntity from '../../../app/entities/CitacaoEntity';

export const manyCitacoesFixture: CitacaoEntity[] = [ /**Array de objetos estáticos citacao, que simula a entrada de vários objetos na aplicacao */
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

export const OneCitacaoFixture: CitacaoEntity = { /**bjeto estático citacao, para simular a entrada de um objeto apenas na aplicacao */
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

export const newCitacaoFixture: CitacaoEntity = { // Obj contendo apenas um titulo e ID, para finalidade de simular um insert
  titulo: 'Citacao 1',
  id_colecao: 1,
};


export const updateCitacaoFixture: CitacaoEntity = { // obj contendo apenas titulo e ID, para finalidade de simular um update
  titulo: 'Citacao 1',
  id_colecao: 1,
};

export const OneCitacaoOnlyFixture: CitacaoEntity = {// obj contendo apenas titulo e ID, para finalidade de simular get one obj only
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  created_at: new Date('2022-01-01'),
};
