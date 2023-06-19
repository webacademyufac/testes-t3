import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import Collection from '../../src/components/collection';
import { collection } from '../factory/collection';
import { ImageURL } from '../../src/entities/url';

describe('<Collection>', () => {
  describe('Deve exibir uma coleção corretamente quando as informações passadas forem válidas', () => {
    it('Deve exibir o título da coleção quando ele for passado na prop "title"', () => {
      const title = faker.word.words(2);       // Gera um título aleatório usando o faker.word.words(2)
      render(<Collection collection={collection({ title })} />);

      expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('Deve exibir o subtítulo da coleção quando ele for passado na prop "subtitle"', () => {
      const subtitle = faker.word.words(7);  // Gera um subtítulo aleatório usando o faker.word.words(7)
      render(<Collection collection={collection({ subtitle })} />);       // Renderiza o componente Collection com a prop "title" gerada

      expect(screen.getByText(subtitle)).toBeInTheDocument();       // Verifica se o título está presente no documento
    });

    it('Deve exibir o nome do autor da coleção quando ele for passado na prop "author"', () => {
      const author = faker.person.fullName();             // Gera um nome de autor aleatório usando o faker.person.fullName()
      render(<Collection collection={collection({ author })} />);       // Renderiza o componente Collection com a prop "subtitle" gerada

      expect(screen.getByText(author)).toBeInTheDocument();       // Verifica se o subtítulo está presente no documento
    });

    it('Deve exibir o botão de editar coleção quando o componente for renderizado', () => {
      render(<Collection collection={collection()} />);       // Renderiza o componente Collection sem nenhuma prop específica

      expect(screen.getByText('Editar')).toBeInTheDocument();       // Verifica se o botão "Editar" está presente no documento
    });

    it('Deve exibir o botão de excluir coleção quando o componente for renderizado', () => {
      render(<Collection collection={collection()} />);       // Renderiza o componente Collection sem nenhuma prop específica

      expect(screen.getByText('Excluir')).toBeInTheDocument();       // Verifica se o botão "Excluir" está presente no documento
    });

    it('Deve exibir uma imagem com o atributo src igual ao valor passado na prop "image"', () => {
      const src = faker.image.url();       // Gera uma URL de imagem aleatória usando o faker.image.url()
      render(<Collection collection={collection({ image: new ImageURL(src) })} />);       // Renderiza o componente Collection com a prop "image" gerada

      expect(screen.getByRole('img').getAttribute('src')).toBe(src);       // Verifica se o atributo src da imagem é igual à URL gerada
    });
  });

  describe('Deve executar corretamente as ações da coleção quando o usuário clicar nelas', () => {
    it('Deve chamar a função de editar passada via prop "onEdit" quando o usuário clicar no botão Editar', async () => {
      const onEdit = jest.fn();       // Cria uma função mock para a ação de editar
      render(<Collection collection={collection()} onEdit={onEdit} />);       // Renderiza o componente Collection com a função onEdit mockada

      await userEvent.click(screen.getByRole('button', { name: 'Editar' }));

      expect(onEdit).toBeCalledTimes(1);   // Verifica se a função onEdit foi chamada uma vez
    });

    it('Deve chamar a função de excluir passada via prop "onDelete" quando o usuário clicar no botão de Excluir', async () => {
      const onDelete = jest.fn();   // Cria uma função mock para a ação de excluir
      render(<Collection collection={collection()} onDelete={onDelete} />);   // Renderiza o componente Collection com a função onDelete mockada

      await userEvent.click(screen.getByRole('button', { name: 'Excluir' }));   // Simula o clique no botão "Excluir"

      expect(onDelete).toBeCalledTimes(1);   // Verifica se a função onDelete foi chamada uma vez
    });
  });
});