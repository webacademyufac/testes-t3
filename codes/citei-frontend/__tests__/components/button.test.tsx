//Essa parte do código é responsável por importar as dependências necessárias para renderizar e testar componentes React, simular interações do usuário e gerar dados falsos realistas 
//Também importa o componente personalizado Button de um diretório específico
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Button from '../../src/components/button';

//Essa parte do código tem como objetivo testar o componente Button em diferentes cenários e verificar se ele se comporta conforme o esperado
//Esses testes têm como objetivo identificar possíveis problemas ou regressões no componente Button e garantir que ele se comporte de acordo com as expectativas definidas

describe('<Button />', () => {
  it('Deve ser igual ao snapshot salvo anteriormente quando o botão for renderizado', () => {
    const words = faker.word.words(3);
    render(<Button title={words} />);

    const button = screen.getByRole('button');

    expect(button).toMatchSnapshot();
  });

  describe('Deve exibir o botão corretamente quando ele for renderizado', () => {
    it('Deve exibir o título do botão quando o valor for passado via prop "Title"', () => {
      const words = faker.word.words(3);
      render(<Button title={words} />);

      const button = screen.getByText(words);

      expect(button).toBeInTheDocument();
    });

    it('Deve chamar a função de "onClick" quando o botão for clicado', async () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} />);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(onClick).toBeCalledTimes(1);
    });
  });
});
