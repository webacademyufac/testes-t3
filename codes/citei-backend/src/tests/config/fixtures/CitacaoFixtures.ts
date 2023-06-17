import CitacaoEntity from '../../../app/entities/CitacaoEntity'; // importa a classe CitacaoEntity do arquivo chamado CitacaoEntity.js dentro do diretório app/entities

export const manyCitacoesFixture: CitacaoEntity[] = [   //Essa parte do código define uma constante chamada manyCitacoesFixture, que é um array de objetos do tipo CitacaoEntity
  {                                                    //Cada objeto representa uma citação com várias propriedades, como id, titulo, id_colecao, colecao, e created_at
    id: 1,                                            //O array manyCitacoesFixture contém duas citações representadas por esses objetos, cada uma com diferentes valores para as propriedades 
    titulo: 'Citacao 1',                             //Essas citações são usadas como um exemplo ou uma "fixação" de dados para testes
    id_colecao: 1,
    colecao: {                         
      id: 1,
      titulo: 'Colecao 1',
      imagem: 'imagem',
      autor: 'autor',
      subtitulo: 'subtitulo',
    },
    created_at: new Date('2022-01-01'),         //A propriedade colecao é outro objeto que contém informações sobre a coleção relacionada à citação, incluindo propriedades como id, titulo, imagem, autor e subtitulo
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

export const OneCitacaoFixture: CitacaoEntity = {         // A constante OneCitacaoFixture é definida como um objeto do tipo CitacaoEntity
  id: 1,                                                 //Este objeto representa uma única citação com várias propriedades, como id, titulo, id_colecao, colecao e created_at
  titulo: 'Citacao 1',                                  //Ela representa apenas uma única citação, em oposição ao array, pode ser utilizada como uma "fixação" de dados para testes
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

export const newCitacaoFixture: CitacaoEntity = {     //A constante newCitacaoFixture é definida como um objeto do tipo CitacaoEntity, esse objeto representa uma nova citação que está sendo criada, com as propriedades titulo e id_colecao definidas
  titulo: 'Citacao 1',                                //titulo é definida como 'Citacao 1', representando o título da nova citação
  id_colecao: 1,                                      //A propriedade id_colecao é definida como 1, indicando o ID da coleção à qual a nova citação está associada
};


export const updateCitacaoFixture: CitacaoEntity = {   
  titulo: 'Citacao 1',
  id_colecao: 1,                                       //A propriedade id_colecao é definida como 1, indicando o novo ID da coleção à qual a citação será associada
};

export const OneCitacaoOnlyFixture: CitacaoEntity = {  // A constante OneCitacaoOnlyFixture é definida como um objeto do tipo CitacaoEntity
  id: 1,                                               //Esse objeto representa uma única citação com algumas propriedades definidas
  titulo: 'Citacao 1',                                 //id: definido como 1, representando o ID da citação, titulo: definido como 'Citacao 1', representando o título da citação, id_colecao: definido como 1, indicando o ID da coleção à qual a citação pertence
  id_colecao: 1,
  created_at: new Date('2022-01-01'),                  //created_at: definido como new Date('2022-01-01'), representando a data de criação da citação
};
