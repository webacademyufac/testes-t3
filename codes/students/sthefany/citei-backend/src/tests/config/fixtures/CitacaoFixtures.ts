// Importa a entidade CitacaoEntity do local específico
import CitacaoEntity from '../../../app/entities/CitacaoEntity';

// Fixture para várias citações
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
    created_at: new Date('2022-01-01'), //armazena a data de criação de uma citação
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

// Fixture para uma única citação
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

// Fixture para uma nova citação a ser criada
export const newCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Fixture para uma citação a ser atualizada
export const updateCitacaoFixture: CitacaoEntity = {
  titulo: 'Citacao 1',
  id_colecao: 1,
};

// Fixture para uma única citação com apenas algumas propriedades
export const OneCitacaoOnlyFixture: CitacaoEntity = {
  id: 1,
  titulo: 'Citacao 1',
  id_colecao: 1,
  created_at: new Date('2022-01-01'),
};
