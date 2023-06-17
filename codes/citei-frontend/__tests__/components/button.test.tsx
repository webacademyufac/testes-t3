import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Button from '../../src/components/button';

// Descreve o conjunto de testes para o componente Button
describe('<Button />', () => {

  // Teste: Verifica se o botão renderizado coincide com um snapshot salvo anteriormente
  it('Deve ser igual ao snapshot salvo anteriormente quando o botão for renderizado', () => {
    const words = faker.word.words(3);
    // Gera palavras aleatórias para o título do botão usando a biblioteca faker
    render(<Button title={words} />);
    
    // Obtém o botão pelo seu papel (role) como "button"
    const button = screen.getByRole('button');
    // Compara o botão com o snapshot salvo anteriormente
    expect(button).toMatchSnapshot();
  });
// Descreve o conjunto de testes para a exibição correta do botão
  describe('Deve exibir o botão corretamente quando ele for renderizado', () => {
  
    // Teste: Verifica se o título do botão é exibido corretamente quando é passado via prop "Title"
    it('Deve exibir o título do botão quando o valor for passado via prop "Title"', () => {
      // Gera palavras aleatórias para o título do botão usando a biblioteca faker
      const words = faker.word.words(3);
      // Renderiza o componente Button com o título gerado
      render(<Button title={words} />);
      
      // Obtém o botão pelo seu texto
      const button = screen.getByText(words);
      // Verifica se o botão com o título está presente no documento (document)
      expect(button).toBeInTheDocument();
    });

    // Teste: Verifica se a função "onClick" é chamada quando o botão é clicado
    it('Deve chamar a função de "onClick" quando o botão for clicado', async () => {
      // Cria uma função mock para simular o comportamento da função "onClick"
      const onClick = jest.fn();
      // Renderiza o componente Button com a função "onClick" mockada
      render(<Button onClick={onClick} />);
      
      // Obtém o botão pelo seu papel (role) como "button"
      const button = screen.getByRole('button');
      // Simula um clique no botão usando a biblioteca userEvent
      await userEvent.click(button);
      // Verifica se a função "onClick" foi chamada uma vez
      expect(onClick).toBeCalledTimes(1);
    });
  });
});
