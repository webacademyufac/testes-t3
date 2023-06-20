import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Quotation from '../../src/components/quotation'; 

describe('<Quotation>', () => {
  describe('Deve deixar de exibir as informações quando elas não forem passadas para o componente', () => {
    it('Deve deixar de renderizar o parágrafo da citação quando nada for passado no atributo "quote"', () => {
      // Renderiza o componente Quotation sem passar nenhuma propriedade
      render(<Quotation />);

      // Verifica se o parágrafo da citação não está presente no documento
      expect(screen.getByTitle('quote-title')).not.toBeInTheDocument();
    });

    it('Deve deixar de renderizar o parágrafo com o nome do autor quando essa informação não for passada', () => {
      // Renderiza o componente Quotation sem passar nenhuma propriedade
      render(<Quotation />);

      // Verifica se o parágrafo com o nome do autor não está presente no documento
      expect(screen.getByTitle('quote-author')).not.toBeInTheDocument();
    });
  });

  describe('Deve renderizar as informações que foram passadas para o componente corretamente', () => {
    it('Deve exibir a citação que for passada no atributo "quote"', () => {
      // Gera uma citação falsa com 10 palavras usando a biblioteca faker-js/faker
      const quote = faker.word.words(10);
      // Renderiza o componente Quotation com a citação gerada
      render(<Quotation quote={quote} />);

      // Verifica se a citação está presente no documento
      expect(screen.getByText(quote)).toBeInTheDocument();
    });

    it('Deve exibir o nome do autor que for passado no atributo "author"', () => {
      // Gera o nome completo de uma pessoa falsa usando a biblioteca faker-js/faker
      const author = faker.person.fullName();
      // Renderiza o componente Quotation com o nome do autor gerado
      render(<Quotation author={author} />);

      // Verifica se o nome do autor está presente no documento
      expect(screen.getByText(author)).toBeInTheDocument();
    });

    it('Deve exibir o nome da coleção quando ela for passada no atributo "collection"', () => {
      // Gera um nome de coleção falso com uma palavra usando a biblioteca faker-js/faker
      const collection = faker.word.words(1);
      // Renderiza o componente Quotation com o nome da coleção gerada
      render(<Quotation collection={collection} />);

      // Verifica se o nome da coleção está presente no documento
      expect(screen.getByText(collection)).toBeInTheDocument();
    });

    it('Deve exibir o ícone de copiar citação', () => {
      // Renderiza o componente Quotation
      render(<Quotation />);

      // Verifica se o ícone de copiar citação está presente no documento
      expect(screen.getByTestId('quotation-copy')).toBeInTheDocument();
    });

    it('Deve exibir o ícone de compartilhar a citação', () => {
      // Renderiza o componente Quotation
      render(<Quotation />);

      // Verifica se o ícone de compartilhar a citação está presente no documento
      expect(screen.getByTestId('quotation-share')).toBeInTheDocument();
    });
  });

  describe('Deve executar corretamente as ações quando o usuário clicar na citação', () => {
    it('Deve executar a função de copiar citação quando o usuário der um double clique no texto da citação', async () => {
      const quote = faker.word.words(10);
      const onCopy = jest.fn();
      render(<Quotation quote={quote} onCopy={onCopy} />);

      await userEvent.dblClick(screen.getByText(quote));

      expect(onCopy).toBeCalledTimes(1);
    });

    it('Deve executar a função de copiar citação quando o usuário clicar no ícone de copiar', async () => {
      const quote = faker.word.words(10);
      const onCopy = jest.fn();
      render(<Quotation quote={quote} onCopy={onCopy} />);

      await userEvent.click(screen.getByTestId('quotation-copy'));

      expect(onCopy).toBeCalledTimes(1);
    });

    it('Deve executar a função de compartilhar citação quando o usuário clicar no ícone de compartilhar', async () => {
      const quote = faker.word.words(10);
      const onShare = jest.fn();
      render(<Quotation quote={quote} onShare={onShare} />);

      await userEvent.click(screen.getByTestId('quotation-share'));

      expect(onShare).toBeCalledTimes(1);
    });
  });
});
