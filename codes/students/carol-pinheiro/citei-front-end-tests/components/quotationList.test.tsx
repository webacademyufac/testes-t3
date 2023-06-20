import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import QuotationList from '../../src/components/quotationList'; // implementa quotation
import { quotation } from '../factory/quotation';

describe('<QuotationList>', () => {
  describe('Deve renderizar o componente corretamente quando uma lista de citações for passada via prop', () => {
    it('Deve exibir o texto das citações quando uma lista de quotation for enviada via prop "quotations"', () => {//Ele verifica se o texto de cada citação é exibido corretamente quando uma lista de citações é passada para o atributo quotations.
      const quotations = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        quotation()
      );

      render(<QuotationList quotations={quotations} />);

      quotations.forEach(quotation =>//forEach percorre cada citação da lista e verifica se o texto da citação está presente no documento usando a função expect e a função getByText do screen.
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
