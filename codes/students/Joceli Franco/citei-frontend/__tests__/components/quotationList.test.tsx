import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import QuotationList from '../../src/components/quotationList'; // implement quotation
import { quotation } from '../factory/quotation';

//O teste assegura que o componente QuotationList esteja exibindo corretamente uma lista de citações na tela,
//verificando se cada item é renderizado de forma adequada.
describe('<QuotationList>', () => {
  describe('Deve renderizar o componente corretamente quando uma lista de citações for passada via prop', () => {
    it('Deve exibir o texto das citações quando uma lista de quotation for enviada via prop "quotations"', () => {
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation()
      );

      render(<QuotationList quotations={quotations} />);

      quotations.forEach(quotation =>
        expect(screen.getByText(quotation.quote)).toBeInTheDocument()
      );
    });

    it('Deve exibir o nome dos autores das citações quando uma lista de quotation for passada via prop "quotations"', () => {
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation()
      );

      render(<QuotationList quotations={quotations} />);

      quotations.forEach(quotation =>
        expect(screen.getByText(quotation.author)).toBeInTheDocument()
      );
    });

    it('Deve exibir o nome da coleção das citações quando uma lista de quotation for passada via prop "quotations"', () => {
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation({ collection: 'colecao' })
      );

      render(<QuotationList quotations={quotations} />);

      expect(screen.getAllByText('colecao').length).toBe(quotations.length);
    });
  });
});
