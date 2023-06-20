import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Button from '../../src/components/button';

describe('<Button />', () => {
  it('Deve ser igual ao snapshot salvo anteriormente quando o botão for renderizado', () => {
    // Gera três palavras falsas usando a biblioteca faker-js/faker
    const words = faker.word.words(3);
    // Renderiza o componente Button com o título gerado
    render(<Button title={words} />);

    // Obtém o botão com base no atributo role "button"
    const button = screen.getByRole('button');

    // Verifica se o botão é igual ao snapshot anteriormente salvo
    expect(button).toMatchSnapshot();
  });

  describe('Deve exibir o botão corretamente quando ele for renderizado', () => {
    it('Deve exibir o título do botão quando o valor for passado via prop "Title"', () => {
      // Gera três palavras falsas usando a biblioteca faker-js/faker
      const words = faker.word.words(3);
      // Renderiza o componente Button com o título gerado
      render(<Button title={words} />);

      // Obtém o elemento contendo o texto igual ao título gerado
      const button = screen.getByText(words);

      // Verifica se o botão está presente no documento
      expect(button).toBeInTheDocument();
    });

    it('Deve chamar a função de "onClick" quando o botão for clicado', async () => {
      // Cria uma função simulada usando o jest.fn()
      const onClick = jest.fn();
      // Renderiza o componente Button com a função de "onClick" simulada
      render(<Button onClick={onClick} />);

      // Obtém o botão com base no atributo role "button"
      const button = screen.getByRole('button');
      // Simula um clique no botão usando o userEvent.click()
      await userEvent.click(button);

      // Verifica se a função de "onClick" foi chamada uma vez
      expect(onClick).toBeCalledTimes(1);
    });
  });
});


