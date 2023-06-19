import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Collection from '../../src/containers/collection';
import { collection } from '../../__tests__/factory/collection';
import { collectionService as collectionServiceFactory } from '../../__tests__/factory/collectionService';

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => { }); // desabilita o alerta do window
});

describe('/containers/collection', () => {
  describe('Deve exibir a tela de coleções corretamente quando nenhuma coleção for injetada', () => {
    it('Deve exibir o título da página quando ela for carregada', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      expect(screen.getByRole('heading', { name: 'Citei' })).toBeInTheDocument(); // verifica se o título da página foi renderizado
    });

    it('Deve renderizar uma lista de coleções vazia quando nenhuma coleção for injetada', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      expect(screen.queryByRole('list')).toBeEmptyDOMElement(); // verifica se a lista de coleções está vazia
    });

    it('Deve exibir o botão de "Adicionar coleção"', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      expect(screen.getByText('Adicionar coleção')).toBeInTheDocument(); // verifica se o botão de "Adicionar coleção" foi renderizado
    });

    it('Deve exibir o subtítulo da página quando ela for carregada', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      expect(
        screen.getByRole('heading', {
          name: 'Coleções, seu conjunto de citações em reunidos em lugar.', // verifica se o subtítulo da página foi renderizado
        })
      );
    });

    it('Deve exibir um ícone de buscar quando a página for carregada', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });

      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      expect(screen.getByLabelText('search-icon')).toBeInTheDocument(); // verifica se o ícone de buscar foi renderizado
    });

    it('Deve esconder o título da página quando o icone de buscar for pressionado', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      await act(async () => userEvent.click(screen.getByLabelText('search-icon'))); // clica no ícone de buscar

      expect(screen.queryByText('Citei')).toBe(null); // verifica se o título da página foi escondido
    });

    it('Deve esconder o subtítulo da página quando o icone de buscar for pressionado', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      await act(async () => userEvent.click(screen.getByLabelText('search-icon'))); // clica no ícone de buscar

      expect(screen.queryByText('Coleções, seu cunjunto de citações em reunidos em lugar.')).toBe(
        null
      ); // verifica se o subtítulo da página foi escondido
    });
  });

  describe('Deve renderizar as coleções corretamente quando elas forem injetadas via prop', () => {
    it('Deve exibir o nome das coleções que foram injetadas via serviço de coleções', async () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection({
          title: faker.word.words(2), // gera um título aleatório
        })
      );
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue(collections), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument()); // verifica se o título de cada coleção foi renderizado
    });
  });

  describe('Deve exibir corretamente o modal de adicionar coleção', () => {
    it('Deve exibir um campo para inserir o título da coleção', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      await userEvent.click(screen.getByText('Adicionar coleção')); // clica no botão de "Adicionar coleção"

      expect(screen.getByPlaceholderText('Título da coleção')).toBeVisible(); // verifica se o campo de título da coleção foi renderizado
    });

    it('Deve exibir um campo para inserir o subtítulo da coleção', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      await userEvent.click(screen.getByText('Adicionar coleção')); // clica no botão de "Adicionar coleção"

      expect(screen.getByPlaceholderText('Subtítulo da coleção')).toBeVisible(); // verifica se o campo de subtítulo da coleção foi renderizado
    });

    it('Deve exibir um campo para inserir link da imagem de capa da coleção', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      await userEvent.click(screen.getByText('Adicionar coleção')); // clica no botão de "Adicionar coleção"

      expect(screen.getByPlaceholderText('Link para imagem de capa')).toBeVisible(); // verifica se o campo de link da imagem de capa da coleção foi renderizado
    });

    it('Deve exibir um campo para inserir o nome do autor da coleção', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      await userEvent.click(screen.getByText('Adicionar coleção')); // clica no botão de "Adicionar coleção"

      expect(screen.getByPlaceholderText('Autor da coleção')).toBeVisible(); // verifica se o campo de nome do autor da coleção foi renderizado
    });

    it('Deve exibir o botão de salvar a coleção', async () => {
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]), // mocka o retorno do serviço de coleções
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente

      await userEvent.click(screen.getByText('Adicionar coleção')); // clica no botão de "Adicionar coleção"

      expect(screen.getByText('Salvar')).toBeVisible(); // verifica se o botão de salvar a coleção foi renderizado
    });

    it('Deve esconder o modal quando o usuário clicar no botão "Salvar" após inserir todas as informações corretamente', async () => {
      const collectionService = collectionServiceFactory(); // cria um serviço de coleções
      const newCollection = collection(); // cria uma nova coleção
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente
      await userEvent.click(screen.getByText('Adicionar coleção')); // clica no botão de "Adicionar coleção"
      await userEvent.type(screen.getByPlaceholderText('Título da coleção'), newCollection.title); // insere o título da coleção
      await userEvent.type(
        screen.getByPlaceholderText('Subtítulo da coleção'), // insere o subtítulo da coleção
        newCollection.subtitle
      );
      await userEvent.type(
        screen.getByPlaceholderText('Link para imagem de capa'), // insere o link da imagem de capa da coleção
        newCollection.image.url
      );
      await userEvent.type(screen.getByPlaceholderText('Autor da coleção'), newCollection.author); // insere o nome do autor da coleção

      await userEvent.click(screen.getByRole('button', { name: 'Salvar' })); // clica no botão de "Salvar"

      expect(window.alert).toBeCalledTimes(0); // verifica se o alerta não foi chamado
      expect(screen.queryByText('Salvar')).toBe(null); // verifica se o botão de "Salvar" não está mais visível
    });
  });

  describe('Deve manter o modal aberto quando o usuário clicar no botão salvar após inserir alguma informação incorreta', () => {
    it('Deve manter o modal aberto quando o usuário clicar no botão de Salvar coleção após não inserir o título da coleção', async () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection()
      );
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue(collections), // mocka o retorno do serviço de coleções
        isValidCollection: () => false,
      });
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente
      await userEvent.click(screen.getByText('Adicionar coleção')); // clica no botão de "Adicionar coleção"

      await userEvent.click(screen.getByText('Salvar')); // clica no botão de "Salvar"

      expect(screen.getByText('Salvar')).toBeVisible(); // verifica se o botão de "Salvar" está visível
    });
  });

  describe('Deve filtrar as coleções corretamente', () => {
    it('Deve exibir a coleção cujo titulo foi digitado no campo de busca', async () => {
      const collections = Array.from(Array(faker.number.int({ min: 4, max: 10 }))).map(() =>
        collection({
          title: faker.word.words(2), 
        }) // cria uma coleção com um título aleatório
      );
      const searchCollection = faker.helpers.arrayElement(collections); // seleciona uma coleção aleatória
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue(collections),
        filterCollections: (name, collections) =>
          collections.filter(collection => collection.title === name),
      }); // cria um serviço de coleções
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente
      await userEvent.click(screen.getByLabelText('search-icon')); // clica no ícone de busca

      await userEvent.type(screen.getByRole('textbox'), searchCollection.title); // insere o título da coleção no campo de busca

      expect(screen.getByText(searchCollection.title)).toBeInTheDocument(); // verifica se a coleção foi renderizada
    });

    it('Deve esconder as coleções cujo título não é igual ao título digitado no campo de busca', async () => {
      const collections = Array.from(Array(faker.number.int({ min: 4, max: 10 }))).map(() =>
        collection({
          title: faker.word.words(2),
        })
      ); // cria um array de coleções com títulos aleatórios
      const [first, second] = faker.helpers.arrayElements(collections, 2); // seleciona duas coleções aleatórias
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue(collections),
        filterCollections: (name, collections) =>
          collections.filter(collection => collection.title === name),
      }); // cria um serviço de coleções
      await act(async () => render(<Collection collectionService={collectionService} />)); // renderiza o componente
      await userEvent.click(screen.getByLabelText('search-icon')); // clica no ícone de busca

      await userEvent.type(screen.getByRole('textbox'), first.title); // insere o título da primeira coleção no campo de busca

      expect(screen.queryByText(second.title)).toBe(null); // verifica se a segunda coleção não foi renderizada
    });
  });
});
