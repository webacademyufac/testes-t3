import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Quotation from '../../src/containers/quotation'; // implement quotation
import { quotation } from '../factory/quotation';

describe('/containers/quotation', () => {
  describe('Deve renderizar a tela de citação corretamente quando nenhuma citação estiver visível', () => {
    it('Deve renderizar o título da página de citações quando ela for renderizada', () => {
      const fetch = jest.fn(() => Promise.resolve([])); // Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza a página

      expect(screen.getByText('Citei')).toBeInTheDocument(); // Espera que o texto citei esteja na página
    });

    it('Deve renderizar o subtítulo da página de citações quando ela for renderizada', () => {
      const fetch = jest.fn(() => Promise.resolve([])); // Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza a página

      expect(screen.getByText('Torne-se um dev “by the book”')).toBeInTheDocument(); // Espera que o texto dentro de getByText esteja no documento
    });

    it('Deve renderizar o botão de adicionar citação quando a página for carregada', () => {
      const fetch = jest.fn(() => Promise.resolve([])); // Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza a página

      expect(screen.getByText('Adicionar citação')).toBeInTheDocument(); // Espera que o botao esteja na tela
    });
  });

  describe('Deve renderizar a tela de citação corretamente quando uma função de mock de citações for injetada', () => {
    it('Deve renderizar uma lista de citações passada via prop "fetchData"', () => {
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() => // Lista de citacao
        quotation({ collection: 'colecao' })
      );
      const fetch = jest.fn(() => Promise.resolve(quotations)); // Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza a página

      quotations.forEach(({ quote }) => expect(screen.getByText(quote)).toBeInTheDocument()); // Espera que as citacoes estejam na tela
    });
  });

  describe('Deve renderizar corretamente o modal de Adicionar citação', () => {
    it('Deve exibir o modal de adicionar citação corretamente quando o usuário clicar no botão de "Adicionar citação"', async () => {
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() => // Gera algumas citacoes
        quotation({ collection: 'colecao' })
      );
      const fetch = jest.fn(() => Promise.resolve(quotations));// Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza a página

      await userEvent.click(screen.getByText('Adicionar citação')); // Clica em adicionar citacao

      expect(screen.getByText('Salvar')).toBeVisible(); // Espera que o botao de salvar esteja visivel (ou seja, o formuário)
    });

    it('Deve exibir um input de texto dentro do modal de adicionar citação quando o usuário clicar no botão de "Adicionar citação"', async () => {
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() => // Gera colecoes
        quotation({ collection: 'colecao' })
      );
      const fetch = jest.fn(() => Promise.resolve(quotations));// Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza página

      await userEvent.click(screen.getByText('Adicionar citação')); // Clica no botao citacao

      expect(screen.getByPlaceholderText('Texto da citação')).toBeVisible(); // Espera que os textos internos dos compos estejão visiveis
    });

    it('Deve continuar exibindo o modal caso o usuário clique no botão de salvar citação sem inserir nenhum texto no campo de citação', async () => {
      const fetch = jest.fn(() => Promise.resolve([]));// Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza página
      await userEvent.click(screen.getByText('Adicionar citação')); // Clica em adicionar colecao

      await userEvent.click(screen.getByText('Salvar')); // Clica em salvar

      expect(screen.getByText('Salvar')).toBeVisible(); // espera que o botao salvar esteja visivel
    });
  });

  describe('Deve filtrar as citações corretamente', () => {
    it('Deve seguir exibindo todas as citações quando o usuário não inserir nenhum texto após clicar no icone de buscar', async () => {
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() => // Gera colecoes
        quotation({ collection: 'colecao' })
      );
      const fetch = jest.fn(() => Promise.resolve(quotations)); // Solicita a página
      render(<Quotation fetchData={fetch} />); // Renderiza página

      await userEvent.click(screen.getByTestId('search-icon')); // Clica em pesquisar

      quotations.forEach(({ quote }) => expect(screen.getByText(quote)).toBeInTheDocument()); // Espera que todos os textos estejam visiveis quando o usuário nao digitar nada
    });

    it('Deve exibir somente a citação cujo texto for inserido no campo de buscar citação', async () => {
      const quotations = Array.from(Array(faker.number.int({ min: 5, max: 10 }))).map(() => //  gera colecoes
        quotation({ collection: 'colecao' })
      );
      const fetch = jest.fn(() => Promise.resolve(quotations)); // Solicita a página
      const [first, second] = faker.helpers.arrayElements(quotations, 2); // Pega texto
      render(<Quotation fetchData={fetch} />); // Solicita a página

      await userEvent.click(screen.getByTestId('search-icon')); // clica em pesquisar
      await userEvent.type(screen.getByRole('textbox'), first.quote); // Insere texto

      expect(screen.getByText(first.quote)).toBeInTheDocument(); // Espera que o first titulo esteja no documento
      expect(screen.getByText(second.quote)).not.toBeInTheDocument();  // Espera que o second titulo esteja no documento
    });
  });
});
