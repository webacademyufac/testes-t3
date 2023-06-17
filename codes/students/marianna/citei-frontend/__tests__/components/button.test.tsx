import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Button from '../../src/components/button';

describe('<Button />', () => {
  it('Deve ser igual ao snapshot salvo anteriormente quando o botão for renderizado', () => {
    const words = faker.word.words(3);     // Gera um título aleatório usando o faker.word.words(3)
    render(<Button title={words} />);     // Renderiza o componente Button com o título gerado

    const button = screen.getByRole('button');     // Obtém o elemento do botão usando screen.getByRole('button')

    expect(button).toMatchSnapshot();     // Verifica se o botão é igual ao snapshot anteriormente salvo
  });

  describe('Deve exibir o botão corretamente quando ele for renderizado', () => {
    it('Deve exibir o título do botão quando o valor for passado via prop "Title"', () => {
      const words = faker.word.words(3);       // Gera um título aleatório usando o faker.word.words(3)
      render(<Button title={words} />);       // Renderiza o componente Button com o título gerado

      const button = screen.getByText(words);       // Obtém o elemento do botão usando screen.getByText(words)

      expect(button).toBeInTheDocument();       // Verifica se o botão está presente no documento
    });

    it('Deve chamar a função de "onClick" quando o botão for clicado', async () => {
      const onClick = jest.fn();       // Cria uma função mock para o evento onClick
      render(<Button onClick={onClick} />);       // Renderiza o componente Button com a função onClick mockada

      const button = screen.getByRole('button');       // Obtém o elemento do botão usando screen.getByRole('button')
      await userEvent.click(button);       // Simula um clique no botão usando userEvent.click(button)

      expect(onClick).toBeCalledTimes(1);       // Verifica se a função onClick foi chamada exatamente uma vez
    });
  });
});
