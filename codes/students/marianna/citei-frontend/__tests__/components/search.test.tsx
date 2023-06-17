import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Search from '../../src/components/search';

describe('<Search />', () => {
  describe('Deve exibir o componente de busca corretamente quando ele for renderizado', () => {
    it('Deve exibir um input text editável quando o icone de busca for clicado', async () => {
      const onToggle = jest.fn(); // Função simulada para ser chamada quando o ícone de busca for clicado
      const onChange = jest.fn(); // Função simulada para ser chamada quando o texto de busca for alterado
      render(<Search onChange={onChange} onToggle={onToggle} />); // Renderiza o componente Search co

      await userEvent.click(screen.getByLabelText('search-icon'));

      expect(screen.getByRole('textbox')).toBeVisible();
    });

    it('Deve exibir um icone de close quando o icone de busca for clicado', async () => {
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));

      expect(screen.getByLabelText('search-close')).toBeVisible();
    });

    it('Deve exibir o texto digitado pelo usuário no input de texto exibido quando o icone de busca for clicado', async () => {
      const title = faker.word.words(1); // Gera um texto falso para simular o título digitado pelo usuário
      const onToggle = jest.fn();  // Função simulada para ser chamada quando o ícone de busca for clicado
      const onChange = jest.fn();  // Função simulada para ser chamada quando o texto de busca for alterado
      render(<Search onChange={onChange} onToggle={onToggle} />);  // Renderiza o componente Search com as funções simuladas

      await userEvent.click(screen.getByLabelText('search-icon'));
      await userEvent.type(screen.getByRole('textbox'), title);

      expect(screen.getByDisplayValue(title)).toBeInTheDocument();
    });

    it('Deve executar a função de "onToggle" quando o usuário clicar no icone de buscar', async () => {
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));

      expect(onToggle).toBeCalledTimes(1);
    });

    it('Deve executar a função de "onChange" o número de vezes igual ao tamanho do texto digitado no campo de buscar', async () => {
      const text = faker.word.words(2);  //Gera um texto falso com duas palavras para simular o texto digitado pelo usuário
      const onToggle = jest.fn();  // Função simulada para ser chamada quando o ícone de busca for clicado
      const onChange = jest.fn();  // Função simulada para ser chamada quando o texto de busca for alterado
      render(<Search onChange={onChange} onToggle={onToggle} />); // Renderiza o componente Search com as funções simuladas

      await userEvent.click(screen.getByLabelText('search-icon')); // Simula um clique no ícone de busca
      await userEvent.type(screen.getByRole('textbox'), text); // Simula a digitação do texto no input de texto

      expect(onChange).toBeCalledTimes(text.length); // Verifica se a função onChange foi chamada o número de vezes igual ao tamanho do texto digitado
      expect(onChange).toHaveBeenCalledWith(text); // Verifica se a função onChange foi chamada com o texto correto como argumento
    });
  });
});
