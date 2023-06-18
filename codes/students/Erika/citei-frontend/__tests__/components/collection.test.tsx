import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Collection from '../../src/components/collection';
import { collection } from '../factory/collection';
import { ImageURL } from '../../src/entities/url';

// Descreve o conjunto de testes para o componente <Collection>
describe('<Collection>', () => {
  // Descreve o conjunto de testes para a exibição correta da coleção
  describe('Deve exibir uma coleção corretamente quando as informações passadas forem válidas', () => {
    // Teste: Verifica se o título da coleção é exibido corretamente quando passado na prop "title"
    it('Deve exibir o título da coleção quando ele for passado na prop "title"', () => {
       // Gera um título aleatório usando a biblioteca faker
      const title = faker.word.words(2);
      // Renderiza o componente Collection com a coleção contendo o título gerado
      render(<Collection collection={collection({ title })} />);
      // Verifica se o título está presente no documento (document)
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    // Teste: Verifica se o subtítulo da coleção é exibido corretamente quando passado na prop "subtitle"
    it('Deve exibir o subtítulo da coleção quando ele for passado na prop "subtitle"', () => {
      // Gera um subtítulo aleatório usando a biblioteca faker
      const subtitle = faker.word.words(7);
      // Renderiza o componente Collection com a coleção contendo o subtítulo gerado
      render(<Collection collection={collection({ subtitle })} />);
      // Verifica se o subtítulo está presente no documento (document)
      expect(screen.getByText(subtitle)).toBeInTheDocument();
    });

    // Teste: Verifica se o nome do autor da coleção é exibido corretamente quando passado na prop "author"
    it('Deve exibir o nome do autor da coleção quando ele for passado na prop "author"', () => {
      // Gera um nome de autor aleatório usando a biblioteca faker
      const author = faker.person.fullName();
      // Renderiza o componente Collection com a coleção contendo o nome do autor gerado
      render(<Collection collection={collection({ author })} />);
      // Verifica se o nome do autor está presente no documento (document)
      expect(screen.getByText(author)).toBeInTheDocument();
    });

    // Teste: Verifica se o botão de excluir coleção é exibido corretamente
    it('Deve exibir o botão de editar coleção quando o componente for renderizado', () => {
      // Renderiza o componente Collection com a coleção vazia
      render(<Collection collection={collection()} />);

      expect(screen.getByText('Editar')).toBeInTheDocument();
    });

    it('Deve exibir o botão de excluir coleção quando o componente for renderizado', () => {
      render(<Collection collection={collection()} />);
      // Verifica se o botão de excluir está presente no documento (document)
      expect(screen.getByText('Excluir')).toBeInTheDocument();
    });

    it('Deve exibir uma imagem com o atributo src igual ao valor passado na prop "image"', () => {
      const src = faker.image.url();
      render(<Collection collection={collection({ image: new ImageURL(src) })} />);

      expect(screen.getByRole('img').getAttribute('src')).toBe(src);
    });
  });

  describe('Deve executar corretamente as ações da coleção quando o usuário clicar nelas', () => {
    it('Deve chamar a função de editar passada via prop "onEdit" quando o usuário clicar no botão Editar', async () => {
      const onEdit = jest.fn();
      render(<Collection collection={collection()} onEdit={onEdit} />);

      await userEvent.click(screen.getByRole('button', { name: 'Editar' }));

      expect(onEdit).toBeCalledTimes(1);
    });

    it('Deve chamar a função de excluir passada via prop "onDelete" quando o usuário clicar no botão de Excluir', async () => {
      const onDelete = jest.fn();
      render(<Collection collection={collection()} onDelete={onDelete} />);

      await userEvent.click(screen.getByRole('button', { name: 'Excluir' }));

      expect(onDelete).toBeCalledTimes(1);
    });
  });
});
