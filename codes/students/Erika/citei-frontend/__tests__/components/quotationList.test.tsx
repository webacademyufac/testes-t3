import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import QuotationList from '../../src/components/quotationList'; // Implementação do componente QuotationList
import { quotation } from '../factory/quotation';

describe('<QuotationList>', () => {
  describe('Deve renderizar o componente corretamente quando uma lista de citações for passada via prop', () => {
    it('Deve exibir o texto das citações quando uma lista de quotation for enviada via prop "quotations"', () => {
      // Gera uma lista de citações falsas com um tamanho aleatório entre 1 e 10 usando a biblioteca faker-js/faker
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation()
      );

      // Renderiza o componente QuotationList com a lista de citações gerada
      render(<QuotationList quotations={quotations} />);

      // Verifica se o texto de cada citação está presente no documento
      quotations.forEach(quotation =>
        expect(screen.getByText(quotation.quote)).toBeInTheDocument()
      );
    });

    it('Deve exibir o nome dos autores das citações quando uma lista de quotation for passada via prop "quotations"', () => {
      // Gera uma lista de citações falsas com um tamanho aleatório entre 1 e 10 usando a biblioteca faker-js/faker
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation()
      );

      // Renderiza o componente QuotationList com a lista de citações gerada
      render(<QuotationList quotations={quotations} />);

      // Verifica se o nome de cada autor está presente no documento
      quotations.forEach(quotation =>
        expect(screen.getByText(quotation.author)).toBeInTheDocument()
      );
    });

    it('Deve exibir o nome da coleção das citações quando uma lista de quotation for passada via prop "quotations"', () => {
      // Gera uma lista de citações falsas com um tamanho aleatório entre 1 e 10 usando a biblioteca faker-js/faker,
      // atribuindo a cada citação uma coleção com o nome 'colecao'
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );

      // Renderiza o componente QuotationList com a lista de citações gerada
      render(<QuotationList quotations={quotations} />);

      // Verifica se o nome da coleção está presente no documento para cada citação
      expect(screen.getAllByText('colecao').length).toBe(quotations.length);
    });
  });
});
