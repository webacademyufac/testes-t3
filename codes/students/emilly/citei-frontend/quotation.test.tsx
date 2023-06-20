import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Quotation from '../../src/containers/quotation'; // implement quotation
import { quotation } from '../factory/quotation';

describe('/containers/quotation', () => {
  // Bloco de testes para verificar a renderização correta da tela de citação quando nenhuma citação está visível
  describe('Deve renderizar a tela de citação corretamente quando nenhuma citação estiver visível', () => {
    // Teste para verificar se o título da página de citações é renderizado corretamente
    it('Deve renderizar o título da página de citações quando ela for renderizada', () => {
      // Configuração da função fetch simulada que retorna uma lista vazia de citações
      const fetch = jest.fn(() => Promise.resolve([]));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Verifica se o texto 'Citei' está presente na tela
      expect(screen.getByText('Citei')).toBeInTheDocument();
    });

    // Teste para verificar se o subtítulo da página de citações é renderizado corretamente
    it('Deve renderizar o subtítulo da página de citações quando ela for renderizada', () => {
      // Configuração da função fetch simulada que retorna uma lista vazia de citações
      const fetch = jest.fn(() => Promise.resolve([]));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Verifica se o texto 'Torne-se um dev “by the book”' está presente na tela
      expect(screen.getByText('Torne-se um dev “by the book”')).toBeInTheDocument();
    });

    // Teste para verificar se o botão de adicionar citação é renderizado corretamente
    it('Deve renderizar o botão de adicionar citação quando a página for carregada', () => {
      // Configuração da função fetch simulada que retorna uma lista vazia de citações
      const fetch = jest.fn(() => Promise.resolve([]));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Verifica se o texto 'Adicionar citação' está presente na tela
      expect(screen.getByText('Adicionar citação')).toBeInTheDocument();
    });
  });

  // Bloco de testes para verificar a renderização correta da tela de citação quando uma função de mock de citações for injetada
  describe('Deve renderizar a tela de citação corretamente quando uma função de mock de citações for injetada', () => {
    // Teste para verificar se uma lista de citações passada via prop "fetchData" é renderizada corretamente
    it('Deve renderizar uma lista de citações passada via prop "fetchData"', () => {
      // Cria uma lista de citações simuladas usando a função mockResolvedValue que retorna um número aleatório de citações
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Configuração da função fetch simulada que retorna a lista de citações criada acima
      const fetch = jest.fn(() => Promise.resolve(quotations));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Verifica se cada citação da lista está presente na tela
      quotations.forEach(({ quote }) => expect(screen.getByText(quote)).toBeInTheDocument());
    });
  });

  // Bloco de testes para verificar a renderização correta do modal de Adicionar citação
  describe('Deve renderizar corretamente o modal de Adicionar citação', () => {
    // Teste para verificar se o modal de adicionar citação é exibido corretamente ao clicar no botão "Adicionar citação"
    it('Deve exibir o modal de adicionar citação corretamente quando o usuário clicar no botão de "Adicionar citação"', async () => {
      // Cria uma lista de citações simuladas usando a função mockResolvedValue que retorna um número aleatório de citações
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Configuração da função fetch simulada que retorna a lista de citações criada acima
      const fetch = jest.fn(() => Promise.resolve(quotations));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Simula o clique no botão "Adicionar citação"
      await userEvent.click(screen.getByText('Adicionar citação'));

      // Verifica se o texto 'Salvar' está visível na tela
      expect(screen.getByText('Salvar')).toBeVisible();
    });

    // Teste para verificar se um campo de texto é exibido dentro do modal de adicionar citação ao clicar no botão "Adicionar citação"
    it('Deve exibir um input de texto dentro do modal de adicionar citação quando o usuário clicar no botão de "Adicionar citação"', async () => {
      // Cria uma lista de citações simuladas usando a função mockResolvedValue que retorna um número aleatório de citações
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Configuração da função fetch simulada que retorna a lista de citações criada acima
      const fetch = jest.fn(() => Promise.resolve(quotations));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Simula o clique no botão "Adicionar citação"
      await userEvent.click(screen.getByText('Adicionar citação'));

      // Verifica se o placeholder 'Texto da citação' está visível na tela
      expect(screen.getByPlaceholderText('Texto da citação')).toBeVisible();
    });

    // Teste para verificar se o modal continua sendo exibido ao clicar no botão de salvar citação sem inserir nenhum texto no campo de citação
    it('Deve continuar exibindo o modal caso o usuário clique no botão de salvar citação sem inserir nenhum texto no campo de citação', async () => {
      // Configuração da função fetch simulada que retorna uma lista vazia de citações
      const fetch = jest.fn(() => Promise.resolve([]));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);
      // Simula o clique no botão "Adicionar citação"
      await userEvent.click(screen.getByText('Adicionar citação'));

      // Simula o clique no botão "Salvar"
      await userEvent.click(screen.getByText('Salvar'));

      // Verifica se o texto 'Salvar' está visível na tela
      expect(screen.getByText('Salvar')).toBeVisible();
    });
  });

  // Bloco de testes para verificar o filtro de citações
  describe('Deve filtrar as citações corretamente', () => {
    // Teste para verificar se todas as citações são exibidas quando o usuário não insere nenhum texto após clicar no ícone de busca
    it('Deve seguir exibindo todas as citações quando o usuário não inserir nenhum texto após clicar no ícone de buscar', async () => {
      // Cria uma lista de citações simuladas usando a função mockResolvedValue que retorna um número aleatório de citações
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Configuração da função fetch simulada que retorna a lista de citações criada acima
      const fetch = jest.fn(() => Promise.resolve(quotations));
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Simula o clique no ícone de busca
      await userEvent.click(screen.getByTestId('search-icon'));

      // Verifica se cada citação da lista está presente na tela
      quotations.forEach(({ quote }) => expect(screen.getByText(quote)).toBeInTheDocument());
    });

    // Teste para verificar se apenas a citação cujo texto é inserido no campo de busca é exibida
    it('Deve exibir somente a citação cujo texto for inserido no campo de buscar citação', async () => {
      // Cria uma lista de citações simuladas usando a função mockResolvedValue que retorna um número aleatório de citações
      const quotations = Array.from(Array(faker.number.int({ min: 5, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Configuração da função fetch simulada que retorna a lista de citações criada acima
      const fetch = jest.fn(() => Promise.resolve(quotations));
      // Cria uma lista com dois elementos aleatórios da lista de citações
      const [first, second] = faker.helpers.arrayElements(quotations, 2);
      // Renderização do componente Quotation com a função fetch simulada
      render(<Quotation fetchData={fetch} />);

      // Simula o clique no ícone de busca
      await userEvent.click(screen.getByTestId('search-icon'));
      // Insere o texto da primeira citação no campo de busca
      await userEvent.type(screen.getByRole('textbox'), first.quote);

      // Verifica se a primeira citação está presente na tela
      expect(screen.getByText(first.quote)).toBeInTheDocument();
      // Verifica se a segunda citação não está presente na tela
      expect(screen.getByText(second.quote)).not.toBeInTheDocument();
    });
  });
});
