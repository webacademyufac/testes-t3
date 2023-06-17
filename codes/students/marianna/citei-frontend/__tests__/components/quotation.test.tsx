import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Quotation from '../../src/components/quotation'; // implement quotation

describe('<Quotation>', () => {
  describe('Deve deixar de exibir as informações quando elas não forem passadas para o componente', () => {
    it('Deve deixar de renderizar o parágrafo da citação quando nada for passado no atributo "quote"', () => {
      render(<Quotation />);

      expect(screen.getByTitle('quote-title')).not.toBeInTheDocument();       
      // Verifica se o elemento com o título 'quote-title' não está presente na tela
    });

    it('Deve deixar de renderizar o paragrafo com o nome do autor quando essa informação não for passada', () => {
      render(<Quotation />);

      expect(screen.getByTitle('quote-author')).not.toBeInTheDocument();       
      // Verifica se o elemento com o título 'quote-author' não está presente na tela
    });
  });

  describe('Deve renderizar as informações que foram passadas para o componente corretamente', () => {
    it('Deve exibir a citação que for passada no atributo "quote"', () => {
      const quote = faker.word.words(10);
      render(<Quotation quote={quote} />);

      expect(screen.getByText(quote)).toBeInTheDocument();       
      // Verifica se o texto da citação está presente na tela
    });

    it('Deve exibir o nome do autor que for passado no atributo "author"', () => {
      const author = faker.person.fullName();
      render(<Quotation author={author} />);

      expect(screen.getByText(author)).toBeInTheDocument();       
      // Verifica se o nome do autor está presente na tela
    });

    it('Deve exibir o nome da coleção quando ela for passada no atributo "collection"', () => {
      const collection = faker.word.words(1);
      render(<Quotation collection={collection} />);

      expect(screen.getByText(collection)).toBeInTheDocument();       
      // Verifica se o nome da coleção está presente na tela
    });

    it('Deve exibir o icone de copiar citação', () => {
      render(<Quotation />);

      expect(screen.getByTestId('quotation-copy')).toBeInTheDocument();       
      // Verifica se o elemento com o atributo data-testid 'quotation-copy' está presente na tela
    });

    it('Deve exibir o icone de compartilhar a citação', () => {
      render(<Quotation />);

      expect(screen.getByTestId('quotation-share')).toBeInTheDocument();       
      // Verifica se o elemento com o atributo data-testid 'quotation-share' está presente na tela
    });
  });

  describe('Deve executar corretamente as ações quando o usuário clicar na citação', () => {
    it('Deve executar a função de copiar citação quando o usuário der um double clique no texto da citação', async () => {
      const quote = faker.word.words(10);
      const onCopy = jest.fn();
      render(<Quotation quote={quote} onCopy={onCopy} />);

      await userEvent.dblClick(screen.getByText(quote));

      expect(onCopy).toBeCalledTimes(1);       
      // Verifica se a função de copiar citação foi chamada uma vez
    });

    it('Deve executar a função de copiar citação quando o usuário clicar no ícone de copiar', async () => {
      const quote = faker.word.words(10);
      const onCopy = jest.fn();
      render(<Quotation quote={quote} onCopy={onCopy} />);

      await userEvent.click(screen.getByTestId('quotation-copy'));

      expect(onCopy).toBeCalledTimes(1);       
      // Verifica se a função de copiar citação foi chamada uma vez
    });

    it('Deve executar a função de compartilhar citação quando o usuário clicar no ícone de compartilhar', async () => {
      const quote = faker.word.words(10);
      const onShare = jest.fn();
      render(<Quotation quote={quote} onShare={onShare} />);

      await userEvent.click(screen.getByTestId('quotation-share'));

      expect(onShare).toBeCalledTimes(1);       
      // Verifica se a função de compartilhar citação foi chamada uma vez

    });
  });
});
