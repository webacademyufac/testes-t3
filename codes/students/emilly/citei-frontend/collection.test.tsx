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

describe('/containers/collection', () => {
  // Testes relacionados à exibição correta da tela de coleções quando nenhuma coleção for injetada
  describe('Deve exibir a tela de coleções corretamente quando nenhuma coleção for injetada', () => {
    // Teste para verificar se o título da página é exibido corretamente
    it('Deve exibir o título da página quando ela for carregada', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o elemento de cabeçalho com o nome 'Citei' está presente na tela
      expect(screen.getByRole('heading', { name: 'Citei' })).toBeInTheDocument();
    });

    // Teste para verificar se a lista de coleções vazia é renderizada corretamente
    it('Deve renderizar uma lista de coleções vazia quando nenhuma coleção for injetada', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o elemento de lista está vazio
      expect(screen.queryByRole('list')).toBeEmptyDOMElement();
    });

    // Teste para verificar se o botão 'Adicionar coleção' é exibido corretamente
    it('Deve exibir o botão de "Adicionar coleção"', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o elemento de texto 'Adicionar coleção' está presente na tela
      expect(screen.getByText('Adicionar coleção')).toBeInTheDocument();
    });

    // Teste para verificar se o subtítulo da página é exibido corretamente
    it('Deve exibir o subtítulo da página quando ela for carregada', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o elemento de cabeçalho com o texto correto está presente na tela
      expect(
        screen.getByRole('heading', {
          name: 'Coleções, seu conjunto de citações em reunidos em lugar.',
        })
      );
    });

    // Teste para verificar se o ícone de busca é exibido corretamente
    it('Deve exibir um ícone de buscar quando a página for carregada', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se o elemento com a label 'search-icon' está presente na tela
      expect(screen.getByLabelText('search-icon')).toBeInTheDocument();
    });

    // Teste para verificar se o título da página é ocultado ao clicar no ícone de busca
    it('Deve esconder o título da página quando o ícone de busca for pressionado', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Simula o clique no ícone de busca
      await act(async () => userEvent.click(screen.getByLabelText('search-icon')));

      // Verifica se o texto 'Citei' não está mais presente na tela
      expect(screen.queryByText('Citei')).toBe(null);
    });

    // Teste para verificar se o subtítulo da página é ocultado ao clicar no ícone de busca
    it('Deve esconder o subtítulo da página quando o ícone de busca for pressionado', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Simula o clique no ícone de busca
      await act(async () => userEvent.click(screen.getByLabelText('search-icon')));

      // Verifica se o texto 'Coleções, seu cunjunto de citações em reunidos em lugar.' não está mais presente na tela
      expect(screen.queryByText('Coleções, seu cunjunto de citações em reunidos em lugar.')).toBe(
        null
      );
    });
  });

  // Bloco de testes para verificar a renderização correta das coleções quando elas são injetadas via prop
  describe('Deve renderizar as coleções corretamente quando elas forem injetadas via prop', () => {
    // Teste para verificar se o nome das coleções é exibido corretamente
    it('Deve exibir o nome das coleções que foram injetadas via serviço de coleções', async () => {
      // Cria uma lista de coleções simuladas usando a função mockResolvedValue que retorna um número aleatório de coleções
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        // Cria uma coleção simulada com um título gerado aleatoriamente
        collection({
          title: faker.word.words(2),
        })
      );
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna a lista de coleções criada acima
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue(collections),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Verifica se cada coleção da lista é exibida na tela pelo seu título
      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
    });
  });

  // Bloco de testes para verificar a exibição correta do modal de adicionar coleção
  describe('Deve exibir corretamente o modal de adicionar coleção', () => {
    // Teste para verificar se o campo de título da coleção é exibido corretamente
    it('Deve exibir um campo para inserir o título da coleção', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Simula o clique no botão 'Adicionar coleção'
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o campo de placeholder 'Título da coleção' está visível na tela
      expect(screen.getByPlaceholderText('Título da coleção')).toBeVisible();
    });

    // Teste para verificar se o campo de subtítulo da coleção é exibido corretamente
    it('Deve exibir um campo para inserir o subtítulo da coleção', async () => {
      // Configuração do serviço de coleções simulado com uma função mockResolvedValue que retorna uma lista vazia de coleções
      const collectionService = collectionServiceFactory({
        getValidCollections: jest.fn().mockResolvedValue([]),
      });
      // Renderização assíncrona do componente Collection com o serviço de coleções configurado
      await act(async () => render(<Collection collectionService={collectionService} />));

      // Simula o clique no botão 'Adicionar coleção'
      await userEvent.click(screen.getByText('Adicionar coleção'));

      // Verifica se o campo de placeholder 'Subtítulo da coleção' está visível na tela
      expect(screen.getByPlaceholderText('Subtítulo da coleção')).toBeVisible();
    });
  });
});
