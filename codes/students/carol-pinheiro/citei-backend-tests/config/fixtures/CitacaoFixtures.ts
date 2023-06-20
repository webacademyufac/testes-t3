import CitacaoEntity from '../../../app/entities/CitacaoEntity'; //importação de CitacaoEntity (entidade)

export const manyCitacoesFixture: CitacaoEntity[] = [ //manyCitacoesFixture está sendo definida como uma constante, declarada com o tipo CitacaoEntity e esse [] indica uma array
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
]; //aparentemente acima está sendo definido uma array de objetos (o que seria um conjunto de objetos?) e apresenta o que pode ser citacoes de exemplo

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

export const newCitacaoFixture: CitacaoEntity = { //aqui é definido uma nova citação 
  titulo: 'Citacao 1',
  id_colecao: 1,
};


export const updateCitacaoFixture: CitacaoEntity = { //aqui é compreensivo que no teste, será testado a atualização de uma citacao
  titulo: 'Citacao 1',
  id_colecao: 1,
};

export const OneCitacaoOnlyFixture: CitacaoEntity = {
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  created_at: new Date('2022-01-01'),
};
