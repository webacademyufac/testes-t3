// Importa as dependências necessárias para escrever os testes
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Quotation from '../../src/containers/quotation'; // implement quotation
import { quotation } from '../factory/quotation';

// Descreve os testes para o componente Quotation
describe('/containers/quotation', () => {
  // Descreve os testes para renderizar a tela de citação corretamente quando nenhuma citação estiver visível
  describe('Deve renderizar a tela de citação corretamente quando nenhuma citação estiver visível', () => {
    // Testa se o título da página de citações é renderizado corretamente
    it('Deve renderizar o título da página de citações quando ela for renderizada', () => {
      // Mock da função fetch que retorna uma Promise vazia
      const fetch = jest.fn(() => Promise.resolve([]));
      render(<Quotation fetchData={fetch} />);

      expect(screen.getByText('Citei')).toBeInTheDocument();
    });

    // Testa se o subtítulo da página de citações é renderizado corretamente
    it('Deve renderizar o subtítulo da página de citações quando ela for renderizada', () => {
      // Mock da função fetch que retorna uma Promise vazia
      const fetch = jest.fn(() => Promise.resolve([]));
      render(<Quotation fetchData={fetch} />);

      expect(screen.getByText('Torne-se um dev “by the book”')).toBeInTheDocument();
    });

    // Testa se o botão de adicionar citação é renderizado corretamente
    it('Deve renderizar o botão de adicionar citação quando a página for carregada', () => {
      // Mock da função fetch que retorna uma Promise vazia
      const fetch = jest.fn(() => Promise.resolve([]));
      render(<Quotation fetchData={fetch} />);

      expect(screen.getByText('Adicionar citação')).toBeInTheDocument();
    });
  });

  // Descreve os testes para renderizar a tela de citação corretamente quando uma função de mock de citações for injetada
  describe('Deve renderizar a tela de citação corretamente quando uma função de mock de citações for injetada', () => {
    // Testa se uma lista de citações passada via prop "fetchData" é renderizada corretamente
    it('Deve renderizar uma lista de citações passada via prop "fetchData"', () => {
      // Gera uma lista de citações falsas
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Mock da função fetch que retorna uma Promise com as citações
      const fetch = jest.fn(() => Promise.resolve(quotations));
      render(<Quotation fetchData={fetch} />);

      // Verifica se todas as citações estão sendo renderizadas corretamente
      quotations.forEach(({ quote }) => expect(screen.getByText(quote)).toBeInTheDocument());
    });
  });

  // Descreve os testes para renderizar corretamente o modal de Adicionar citação
  describe('Deve renderizar corretamente o modal de Adicionar citação', () => {
    // Testa se o modal de adicionar citação é exibido corretamente quando o usuário clica no botão "Adicionar citação"
    it('Deve exibir o modal de adicionar citação corretamente quando o usuário clicar no botão de "Adicionar citação"', async () => {
      // Gera uma lista de citações falsas
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Mock da função fetch que retorna uma Promise com as citações
      const fetch = jest.fn(() => Promise.resolve(quotations));
      render(<Quotation fetchData={fetch} />);

      // Clica no botão "Adicionar citação"
      await userEvent.click(screen.getByText('Adicionar citação'));

      // Verifica se o botão "Salvar" está visível no modal
      expect(screen.getByText('Salvar')).toBeVisible();
    });

    // Testa se um input de texto é exibido corretamente dentro do modal de adicionar citação quando o usuário clica no botão "Adicionar citação"
    it('Deve exibir um input de texto dentro do modal de adicionar citação quando o usuário clicar no botão de "Adicionar citação"', async () => {
      // Gera uma lista de citações falsas
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Mock da função fetch que retorna uma Promise com as citações
      const fetch = jest.fn(() => Promise.resolve(quotations));
      render(<Quotation fetchData={fetch} />);

      // Clica no botão "Adicionar citação"
      await userEvent.click(screen.getByText('Adicionar citação'));

      // Verifica se o input de texto está visível no modal
      expect(screen.getByPlaceholderText('Texto da citação')).toBeVisible();
    });

    // Testa se o modal de adicionar citação continua sendo exibido caso o usuário clique no botão de salvar citação sem inserir nenhum texto no campo de citação
    it('Deve continuar exibindo o modal caso o usuário clique no botão de salvar citação sem inserir nenhum texto no campo de citação', async () => {
      // Mock da função fetch que retorna uma Promise vazia
      const fetch = jest.fn(() => Promise.resolve([]));
      render(<Quotation fetchData={fetch} />);
      // Clica no botão "Adicionar citação"
      await userEvent.click(screen.getByText('Adicionar citação'));

      // Clica no botão "Salvar" sem inserir texto no campo de citação
      await userEvent.click(screen.getByText('Salvar'));

      // Verifica se o botão "Salvar" continua visível no modal
      expect(screen.getByText('Salvar')).toBeVisible();
    });
  });

  // Descreve os testes para filtrar as citações corretamente
  describe('Deve filtrar as citações corretamente', () => {
    // Testa se todas as citações continuam sendo exibidas quando o usuário não insere nenhum texto após clicar no ícone de busca
    it('Deve seguir exibindo todas as citações quando o usuário não inserir nenhum texto após clicar no ícone de buscar', async () => {
      // Gera uma lista de citações falsas
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Mock da função fetch que retorna uma Promise com as citações
      const fetch = jest.fn(() => Promise.resolve(quotations));
      render(<Quotation fetchData={fetch} />);

      // Clica no ícone de busca
      await userEvent.click(screen.getByTestId('search-icon'));

      // Verifica se todas as citações estão sendo exibidas corretamente
      quotations.forEach(({ quote }) => expect(screen.getByText(quote)).toBeInTheDocument());
    });

    // Testa se apenas a citação cujo texto foi inserido no campo de busca é exibida
    it('Deve exibir somente a citação cujo texto for inserido no campo de buscar citação', async () => {
      // Gera uma lista de citações falsas
      const quotations = Array.from(Array(faker.number.int({ min: 5, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );
      // Mock da função fetch que retorna uma Promise com as citações
      const fetch = jest.fn(() => Promise.resolve(quotations));
      const [first, second] = faker.helpers.arrayElements(quotations, 2);
      render(<Quotation fetchData={fetch} />);

      // Clica no ícone de busca
      await userEvent.click(screen.getByTestId('search-icon'));
      // Insere o texto da primeira citação no campo de busca
      await userEvent.type(screen.getByRole('textbox'), first.quote);

      // Verifica se apenas a primeira citação está sendo exibida
      expect(screen.getByText(first.quote)).toBeInTheDocument();
      expect(screen.getByText(second.quote)).not.toBeInTheDocument();
    });
  });
});
