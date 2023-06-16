import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Collection from '../../src/containers/collection';
import { collection } from '../../__tests__/factory/collection';
import { collectionService as collectionServiceFactory } from '../../__tests__/factory/collectionService';

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => { });
});

// Descreve o teste de unidade do componente Collection
describe('/containers/collection', () => {
  describe('Deve exibir a tela de coleções corretamente quando nenhuma coleção for injetada', () => {
    // Testa se o título da página é exibido corretamente ao ser carregada
    it('Deve exibir o título da página quando ela for carregada', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o título da página está presente no DOM
      expect(screen.getByRole('heading', { name: 'Citei' })).toBeInTheDocument();
    });

    // Testa se a lista de coleções vazia é renderizada corretamente
    it('Deve renderizar uma lista de coleções vazia quando nenhuma coleção for injetada', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o elemento de lista está vazio no DOM
      expect(screen.queryByRole('list')).toBeEmptyDOMElement();
    });

    // Testa se o botão "Adicionar coleção" é exibido corretamente
    it('Deve exibir o botão de "Adicionar coleção"', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o botão "Adicionar coleção" está presente no DOM
      expect(screen.getByText('Adicionar coleção')).toBeInTheDocument();
    });

    // Testa se o subtítulo da página é exibido corretamente ao ser carregada
    it('Deve exibir o subtítulo da página quando ela for carregada', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o subtítulo da página está presente no DOM
      expect(
        screen.getByRole('heading', {
          name: 'Coleções, seu conjunto de citações em reunidos em lugar.',
        })
      );
    });

    // Testa se o ícone de busca é exibido corretamente ao ser carregada a página
    it('Deve exibir um ícone de buscar quando a página for carregada', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o ícone de busca está presente no DOM
      expect(screen.getByLabelText('search-icon')).toBeInTheDocument();
    });

    // Testa se o título da página é escondido ao clicar no ícone de busca
    it('Deve esconder o título da página quando o icone de buscar for pressionado', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no ícone de busca
      await act(async () => userEvent.click(screen.getByLabelText('search-icon')));

      // Verifica se o título da página não está presente no DOM
      expect(screen.queryByText('Citei')).toBe(null);
    });

    // Testa se o subtítulo da página é escondido ao clicar no ícone de busca
    it('Deve esconder o subtítulo da página quando o icone de buscar for pressionado', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no ícone de busca
      await act(async () => userEvent.click(screen.getByLabelText('search-icon')));

      // Verifica se o subtítulo da página não está presente no DOM
      expect(screen.queryByText('Coleções, seu cunjunto de citações em reunidos em lugar.')).toBe(null);
    });
  });

  // Descreve os testes para renderização das coleções quando injetadas via prop
  describe('Deve renderizar as coleções corretamente quando elas forem injetadas via prop', () => {
    // Testa se o nome das coleções é exibido corretamente ao serem injetadas via serviço de coleções
    it('Deve exibir o nome das coleções que foram injetadas via serviço de coleções', async () => {
      // Cria um array de coleções com tamanhos aleatórios
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection({
          title: faker.word.words(2),
        })
      );
      // Configura o mock do serviço de coleções para retornar as coleções criadas
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue(collections),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se cada nome de coleção está presente no DOM
      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
    });
  });

  // Descreve os testes para exibir corretamente o modal de adicionar coleção
  describe('Deve exibir corretamente o modal de adicionar coleção', () => {
    // Testa se um campo para inserir o título da coleção é exibido
    it('Deve exibir um campo para inserir o título da coleção', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no botão de "Adicionar coleção"
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o campo de título da coleção está visível
      expect(screen.getByPlaceholderText('Título da coleção')).toBeVisible();
    });

    // Testa se um campo para inserir o subtítulo da coleção é exibido
    it('Deve exibir um campo para inserir o subtítulo da coleção', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no botão de "Adicionar coleção"
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o campo de subtítulo da coleção está visível
      expect(screen.getByPlaceholderText('Subtítulo da coleção')).toBeVisible();
    });

    // Testa se um campo para inserir o link da imagem de capa da coleção é exibido
    it('Deve exibir um campo para inserir link da imagem de capa da coleção', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no botão de "Adicionar coleção"
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o campo de link da imagem de capa está visível
      expect(screen.getByPlaceholderText('Link para imagem de capa')).toBeVisible();
    });

    // Testa se um campo para inserir o nome do autor da coleção é exibido
    it('Deve exibir um campo para inserir o nome do autor da coleção', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no botão de "Adicionar coleção"
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o campo do nome do autor da coleção está visível
      expect(screen.getByPlaceholderText('Nome do autor da coleção')).toBeVisible();
    });

    // Testa se um botão para adicionar a coleção é exibido
    it('Deve exibir um botão para adicionar a coleção', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no botão de "Adicionar coleção"
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o botão de adicionar a coleção está visível
      expect(screen.getByText('Adicionar')).toBeVisible();
    });

    // Testa se o modal de adicionar coleção é exibido corretamente
    it('Deve exibir o modal de adicionar coleção quando o botão "Adicionar coleção" for clicado', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no botão de "Adicionar coleção"
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o modal de adicionar coleção está visível
      expect(screen.getByText('Adicionar coleção')).toBeVisible();
    });

    // Testa se o modal de adicionar coleção é fechado corretamente
    it('Deve fechar o modal de adicionar coleção quando o botão "Fechar" for clicado', async () => {
      // Configura o mock do serviço de coleções para retornar uma lista vazia
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });

      // Renderiza o componente Collection
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Clica no botão de "Adicionar coleção"
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Clica no botão de "Fechar"
      await userEvent.click(screen.getByText('Fechar'));

      // Verifica se o modal de adicionar coleção não está mais visível
      expect(screen.queryByText('Adicionar coleção')).toBe(null);
    });
  });
});
