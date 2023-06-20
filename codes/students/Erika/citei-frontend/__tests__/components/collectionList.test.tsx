import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import CollectionList from '../../src/components/collectionList';
import { collection } from '../factory/collection';
import { ICollection } from '../../src/interfaces/collection';

describe('<CollectionList>', () => {
  describe('Deve renderizar uma lista de coleções em branco', () => {
    it('Deve exibir um elemento em branco quando uma lista de coleções vazia for injetada via prop', () => {
      // Cria uma lista vazia de coleções
      const collections = [] as ICollection[];
      // Renderiza o componente CollectionList com a lista vazia
      const { container } = render(<CollectionList collections={collections} />);

      // Verifica se o primeiro filho do container está vazio
      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('Deve exibir corretamente o nome de todas as coleções passadas via prop', () => {
      // Cria uma lista de coleções com um número aleatório de elementos
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection()
      );
      // Renderiza o componente CollectionList com as coleções geradas
      render(<CollectionList collections={collections} />);

      // Verifica se cada título de coleção está presente no documento
      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
    });

    it('Deve renderizar o mesmo número de coleções passadas via prop "collections"', () => {
      // Cria uma lista de coleções com um número aleatório de elementos
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection()
      );

      // Renderiza o componente CollectionList com as coleções geradas
      const { container } = render(<CollectionList collections={collections} />);

      // Verifica se o número de nós filhos do primeiro elemento do container é igual ao número de coleções
      expect(container.firstChild?.childNodes.length).toBe(collections.length);
    });
  });
});
