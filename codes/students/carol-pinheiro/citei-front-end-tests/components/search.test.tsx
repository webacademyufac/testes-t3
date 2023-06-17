import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Search from '../../src/components/search';

describe('<Search />', () => {
  describe('Deve exibir o componente de busca corretamente quando ele for renderizado', () => {
    it('Deve exibir um input text editável quando o icone de busca for clicado', async () => {//O primeiro teste verifica se um campo de texto editável é exibido quando o ícone de busca é clicado. Ele cria duas funções onToggle e onChange como simuladores de callback, renderiza o componente <Search /> passando as propriedades onChange e onToggle, e então usa a função click do userEvent para clicar no ícone de busca. Em seguida, verifica se o campo de texto está visível usando a função toBeVisible
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));

      expect(screen.getByRole('textbox')).toBeVisible();
    });

    it('Deve exibir um icone de close quando o icone de busca for clicado', async () => {//O segundo teste verifica se o ícone de fechar é exibido quando o ícone de busca é clicado. Ele segue a mesma lógica do primeiro teste, mas usa a função getByLabelText para selecionar o ícone de fechar e a função toBeVisible para verificar se ele está visível.
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));

      expect(screen.getByLabelText('search-close')).toBeVisible();
    });

    it('Deve exibir o texto digitado pelo usuário no input de texto exibido quando o icone de busca for clicado', async () => {//O terceiro teste verifica se o texto digitado pelo usuário é exibido corretamente no campo de texto quando o ícone de busca é clicado. Ele gera um título aleatório usando o faker, cria as funções onToggle e onChange como simuladores de callback, renderiza o componente <Search /> passando as propriedades onChange e onToggle, e então usa as funções click e type do userEvent para simular o clique no ícone de busca e digitar o texto no campo de texto. Por fim, usa a função getByDisplayValue para verificar se o valor digitado está presente no campo de texto.
      const title = faker.word.words(1);
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));
      await userEvent.type(screen.getByRole('textbox'), title);

      expect(screen.getByDisplayValue(title)).toBeInTheDocument();
    });

    it('Deve executar a função de "onToggle" quando o usuário clicar no icone de buscar', async () => {//O quarto teste verifica se a função onToggle é executada corretamente quando o ícone de busca é clicado. Ele cria as funções onToggle e onChange como simuladores de callback, renderiza o componente <Search /> passando as propriedades onChange e onToggle, e então usa a função click do userEvent para clicar no ícone de busca. Por fim, usa a função toBeCalledTimes para verificar se a função onToggle foi chamada exatamente uma vez.
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));

      expect(onToggle).toBeCalledTimes(1);
    });

    it('Deve executar a função de "onChange" o número de vezes igual ao tamanho do texto digitado no campo de buscar', async () => {//O quinto teste verifica se a função onChange é executada corretamente com o número correto de vezes, de acordo com o tamanho do texto digitado no campo de busca. Ele gera um texto aleatório usando o faker, cria as funções onToggle e onChange como simuladores de callback, renderiza o componente <Search /> passando as propriedades onChange e onToggle, e então usa as funções click e type do userEvent para simular o clique no ícone de busca e digitar o texto no campo de texto. Por fim, usa a função toBeCalledTimes para verificar se a função onChange foi chamada exatamente o número de vezes igual ao tamanho do texto digitado, e a função toHaveBeenCalledWith para verificar se a função onChange foi chamada com o texto correto como argumento.
      const text = faker.word.words(2);
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(<Search onChange={onChange} onToggle={onToggle} />);

      await userEvent.click(screen.getByLabelText('search-icon'));
      await userEvent.type(screen.getByRole('textbox'), text);

      expect(onChange).toBeCalledTimes(text.length);
      expect(onChange).toHaveBeenCalledWith(text);
    });
  });
});
