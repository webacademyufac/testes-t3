import CitacaoEntity from '../../../app/entities/CitacaoEntity';
//fixture é um conjunto de dados pré-definidos que é usado para fornecer um ambiente
// consistente e conhecido para testes de software e outros fins relacionados
// Fixture contendo uma lista de citações
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

// Fixture contendo uma única citação
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

// Fixture contendo uma nova citação a ser criada
export const newCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Fixture contendo uma citação atualizada
export const updateCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Fixture contendo uma única citação, com apenas informações básicas (apenas o texto da citação)
export const OneCitacaoOnlyFixture: CitacaoEntity = {
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  created_at: new Date('2022-01-01'),
};
