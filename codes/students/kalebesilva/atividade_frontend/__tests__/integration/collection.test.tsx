import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Collection from '../../src/containers/collection';
import { collection } from '../../__tests__/factory/collection';
import { collectionService as collectionServiceFactory } from '../../__tests__/factory/collectionService';

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => { }); // Jest espionando os windows alert
});

describe('/containers/collection', () => {
  describe('Deve exibir a tela de coleções corretamente quando nenhuma coleção for injetada', () => {
    it('Deve exibir o título da página quando ela for carregada', async () => {
      const collectionService = collectionServiceFactory({  // Preparando para fazer a operacao
        getValidCollections: jest.fn().mockResolvedValue([]), //Prepara o mock
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); //Renderizenda a const collectionService na tela

      expect(screen.getByRole('heading', { name: 'Citei' })).toBeInTheDocument(); // espera que ela tenha o nome Citei
    });

    it('Deve renderizar uma lista de coleções vazia quando nenhuma coleção for injetada', async () => {
      const collectionService = collectionServiceFactory({ // Recebe a lista vazia
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza ela na tela

      expect(screen.queryByRole('list')).toBeEmptyDOMElement();// Espera que ela esteja vazia
    });

    it('Deve exibir o botão de "Adicionar coleção"', async () => {
      const collectionService = collectionServiceFactory({ //Prepara o conteúdo
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o botao

      expect(screen.getByText('Adicionar coleção')).toBeInTheDocument(); // Espera que o botao, com o texto "adicionar coleção" esteja escrito no documento
    });

    it('Deve exibir o subtítulo da página quando ela for carregada', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o obj para ser rendezirado na tela
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o subtitulo na tela

      expect(
        screen.getByRole('heading', {
          name: 'Coleções, seu conjunto de citações em reunidos em lugar.', // Espera que ele contenha a seguinte frase
        })
      );
    });

    it('Deve exibir um ícone de buscar quando a página for carregada', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o obj para ser renderizado
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza na tela o icone de buscar quando a página é carregada

      expect(screen.getByLabelText('search-icon')).toBeInTheDocument(); // espera que o icon esteja no documento
    });

    it('Deve esconder o título da página quando o icone de buscar for pressionado', async () => {
      const collectionService = collectionServiceFactory({ //Prepara o documento para ser renderizado
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento

      await act(async () => userEvent.click(screen.getByLabelText('search-icon')));//  faz um evento click para simular um click no icone

      expect(screen.queryByText('Citei')).toBe(null); //Espera que o botao não esteja aparecendo
    });

    it('Deve esconder o subtítulo da página quando o icone de buscar for pressionado', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o documento
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o documento na tela

      await act(async () => userEvent.click(screen.getByLabelText('search-icon'))); // Simula um click icone

      expect(screen.queryByText('Coleções, seu cunjunto de citações em reunidos em lugar.')).toBe( // Espera que o subtitulo suma
        null
      );
    });
  });

  describe('Deve renderizar as coleções corretamente quando elas forem injetadas via prop', () => {
    it('Deve exibir o nome das coleções que foram injetadas via serviço de coleções', async () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() => /*Gera uma quantidade aleatoria de objetos, cujo
      a quantidade minima é 1 e o max é 10, depois de gerados, guarda eles na constante collections */
        collection({
          title: faker.word.words(2),
        })
      );
      const collectionService = collectionServiceFactory({ // Prepara para ser renderizado na tela
        getValidCollections: jest.fn().mockResolvedValue(collections),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento

      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument()); /*Espera que todos os objetos titúlo
      sejam renderizados na tela */
    });
  });

  describe('Deve exibir corretamente o modal de adicionar coleção', () => {
    it('Deve exibir um campo para inserir o título da coleção', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o documento
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento na tela

      await userEvent.click(screen.getByText('Adicionar coleção')); // Simula um click no campo adicionar colecao

      expect(screen.getByPlaceholderText('Título da coleção')).toBeVisible(); // Espera que o campo adicionar colecao esteja visivel
    });

    it('Deve exibir um campo para inserir o subtítulo da coleção', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o documento
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento

      await userEvent.click(screen.getByText('Adicionar coleção')); // Simula um click no campo adicionar colecao

      expect(screen.getByPlaceholderText('Subtítulo da coleção')).toBeVisible(); // Espera que o campo de inserir o subtitulo esteja visivel
    });

    it('Deve exibir um campo para inserir link da imagem de capa da coleção', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o documento
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento

      await userEvent.click(screen.getByText('Adicionar coleção')); // Simula o evento no campo adicionar colecao

      expect(screen.getByPlaceholderText('Link para imagem de capa')).toBeVisible(); /*Espera que o campo para inserir link da imagem
      esteja visível */
    });

    it('Deve exibir um campo para inserir o nome do autor da coleção', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o documento
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento

      await userEvent.click(screen.getByText('Adicionar coleção'));// Siluma um evento click no obj geral de adicionar colecao

      expect(screen.getByPlaceholderText('Autor da coleção')).toBeVisible(); // espera que o campo do autor esteja visível
    });

    it('Deve exibir o botão de salvar a coleção', async () => {
      const collectionService = collectionServiceFactory({ // Prepara o documento
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      await act(async () => render(<Collection collectionService={collectionService} />));  // Renderiza o documento

      await userEvent.click(screen.getByText('Adicionar coleção')); // Clica em adicionar colecao

      expect(screen.getByText('Salvar')).toBeVisible(); //  Espera que o botão salvar esteja visivel
    });

    it('Deve esconder o modal quando o usuário clicar no botão "Salvar" após inserir todas as informações corretamente', async () => {

      /*Cria um mock de um obj  simula uma insersão de formulário */
      const collectionService = collectionServiceFactory();
      const newCollection = collection();
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento
      await userEvent.click(screen.getByText('Adicionar coleção')); // Simula um click em adicionar colecao
      await userEvent.type(screen.getByPlaceholderText('Título da coleção'), newCollection.title); /*Simula um click no campo titulo e
      insere um titulo */
      await userEvent.type( /*Simula um click em subtitulo e insere um subtitulo */
        screen.getByPlaceholderText('Subtítulo da coleção'),
        newCollection.subtitle
      );
      await userEvent.type( /*Simula o click em imagem e insere uma nova imagem */
        screen.getByPlaceholderText('Link para imagem de capa'),
        newCollection.image.url
      );
      await userEvent.type(screen.getByPlaceholderText('Autor da coleção'), newCollection.author); /*Clica em autor da colecao e adiciona um novo autor */

      await userEvent.click(screen.getByRole('button', { name: 'Salvar' })); /*Clica no botao de salvar o formulário */

      expect(window.alert).toBeCalledTimes(0); // Espera que um window alerta seja chamado
      expect(screen.queryByText('Salvar')).toBe(null); // Espera que o model não seja mais visível após clicar em salvar inserindo os dados corretamente
    });
  });

  describe('Deve manter o modal aberto quando o usuário clicar no botão salvar após inserir alguma informação incorreta', () => {
    it('Deve manter o modal aberto quando o usuário clicar no botão de Salvar coleção após não inserir o título da coleção', async () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 })).map(() => /*Gera uma quantidade aleátoria de
      colecoes e salva em uma constante de arrays  */
        collection()
      );
      const collectionService = collectionServiceFactory({  // gera uma colecao de service
        getValidCollections: jest.fn().mockResolvedValue(collections),
        isValidCollection: () => false,
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza na tela
      await userEvent.click(screen.getByText('Adicionar coleção')); //Simula um evento de click em adicionar colecao

      await userEvent.click(screen.getByText('Salvar')); // Clica em salvar

      expect(screen.getByText('Salvar')).toBeVisible(); // Esperar que o botao salvar não esteja visivel
    });
  });

  describe('Deve filtrar as coleções corretamente', () => {

    it('Deve exibir a coleção cujo titulo foi digitado no campo de busca', async () => {
      //Gera uma quantidade aleatorias de titulos
      const collections = Array.from(Array(faker.number.int({ min: 4, max: 10 }))).map(() =>
        collection({
          title: faker.word.words(2),
        })
      );

      const searchCollection = faker.helpers.arrayElement(collections); // Pega uma coleção aleatoria do array
      const collectionService = collectionServiceFactory({ // prepara o documento
        getValidCollections: jest.fn().mockResolvedValue(collections),
        filterCollections: (name, collections) =>
          collections.filter(collection => collection.title === name),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento
      await userEvent.click(screen.getByLabelText('search-icon')); // Simula um click no icone

      await userEvent.type(screen.getByRole('textbox'), searchCollection.title); // Busca o titulo

      expect(screen.getByText(searchCollection.title)).toBeInTheDocument(); // Espera que o titulo buscado esteja no documento
    });

    it('Deve esconder as coleções cujo título não é igual ao título digitado no campo de busca', async () => {
      //Gera um array de titulos aleatorios entre 4 e 10 objetos
      const collections = Array.from(Array(faker.number.int({ min: 4, max: 10 }))).map(() =>
        collection({
          title: faker.word.words(2),
        })
      );
      const [first, second] = faker.helpers.arrayElements(collections, 2); // pega dois titulos do array
      const collectionService = collectionServiceFactory({ // Prepara o documento
        getValidCollections: jest.fn().mockResolvedValue(collections),
        filterCollections: (name, collections) =>
          collections.filter(collection => collection.title === name),
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // Renderiza o documento
      await userEvent.click(screen.getByLabelText('search-icon')); // Click em buscar

      await userEvent.type(screen.getByRole('textbox'), first.title); // Pesquisa o titulo

      expect(screen.queryByText(second.title)).toBe(null); // Espera que o titulos não encontrados não estejam na página
    });
  });
});
