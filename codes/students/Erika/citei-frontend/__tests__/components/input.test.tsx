import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Input from '../../src/components/input';

describe('<Input />', () => {
  describe('Deve renderizar o input corretamente', () => {
    it('Deve renderizar o input com o texto que for passado via prop "value"', () => {
      // Gera um texto falso com duas palavras usando a biblioteca faker-js/faker
      const text = faker.word.words(2);

      // Renderiza o componente Input com o valor de texto gerado
      render(<Input value={text} onChange={() => {}} />);

      // Verifica se o input exibe corretamente o texto fornecido via prop "value"
      expect(screen.getByDisplayValue(text)).toBeInTheDocument();
    });

    it('Deve exibir o texto que for digitado pelo usuário dentro do input', async () => {
      // Gera um texto falso com duas palavras usando a biblioteca faker-js/faker
      const text = faker.word.words(2);
      // Renderiza o componente Input com o valor de texto gerado
      render(<Input value={text} onChange={() => {}} />);

      // Simula a digitação do texto dentro do input usando o userEvent.type()
      await userEvent.type(screen.getByRole('textbox'), text);

      // Verifica se o input exibe corretamente o texto digitado pelo usuário
      expect(screen.getByDisplayValue(text)).toBeInTheDocument();
    });
  });
});
