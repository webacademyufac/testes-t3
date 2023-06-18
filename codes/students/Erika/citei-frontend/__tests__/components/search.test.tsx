import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Search from '../../src/components/search';

describe('<Search />', () => {
  describe('Deve exibir o componente de busca corretamente quando ele for renderizado', () => {
    it('Deve exibir um input text editável quando o ícone de busca for clicado', async () => {
      // Definindo as funções de callback vazias
      const onToggle = jest.fn();
      const onChange = jest.fn();

      // Renderizando o componente Search
      render(<Search onChange={onChange} onToggle={onToggle} />);

      // Clicando no ícone de busca
      await userEvent.click(screen.getByLabelText('search-icon'));

      // Verificando se o input de texto é exibido
      expect(screen.getByRole('textbox')).toBeVisible();
    });

    it('Deve exibir um ícone de fechar quando o ícone de busca for clicado', async () => {
      // Definindo as funções de callback vazias
      const onToggle = jest.fn();
      const onChange = jest.fn();

      // Renderizando o componente Search
      render(<Search onChange={onChange} onToggle={onToggle} />);

      // Clicando no ícone de busca
      await userEvent.click(screen.getByLabelText('search-icon'));

      // Verificando se o ícone de fechar é exibido
      expect(screen.getByLabelText('search-close')).toBeVisible();
    });

    it('Deve exibir o texto digitado pelo usuário no input de texto exibido quando o ícone de busca for clicado', async () => {
      // Gerando um título aleatório
      const title = faker.word.words(1);

      // Definindo as funções de callback vazias
      const onToggle = jest.fn();
      const onChange = jest.fn();

      // Renderizando o componente Search
      render(<Search onChange={onChange} onToggle={onToggle} />);

      // Clicando no ícone de busca
      await userEvent.click(screen.getByLabelText('search-icon'));

      // Digitando o título no input de texto
      await userEvent.type(screen.getByRole('textbox'), title);

      // Verificando se o texto digitado está presente no input de texto
      expect(screen.getByDisplayValue(title)).toBeInTheDocument();
    });

    it('Deve executar a função "onToggle" quando o usuário clicar no ícone de busca', async () => {
      // Definindo as funções de callback vazias
      const onToggle = jest.fn();
      const onChange = jest.fn();

      // Renderizando o componente Search
      render(<Search onChange={onChange} onToggle={onToggle} />);

      // Clicando no ícone de busca
      await userEvent.click(screen.getByLabelText('search-icon'));

      // Verificando se a função "onToggle" foi chamada uma vez
      expect(onToggle).toBeCalledTimes(1);
    });

    it('Deve executar a função "onChange" o número de vezes igual ao tamanho do texto digitado no campo de busca', async () => {
      // Gerando um texto aleatório
      const text = faker.word.words(2);

      // Definindo as funções de callback vazias
      const onToggle = jest.fn();
      const onChange = jest.fn();

      // Renderizando o componente Search
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));
      await userEvent.type(screen.getByRole('textbox'), text);

      expect(onChange).toBeCalledTimes(text.length);
      expect(onChange).toHaveBeenCalledWith(text);
    });
  });
});
