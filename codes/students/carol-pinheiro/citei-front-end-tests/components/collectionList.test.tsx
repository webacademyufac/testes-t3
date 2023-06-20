import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import CollectionList from '../../src/components/collectionList';
import { collection } from '../factory/collection';
import { ICollection } from '../../src/interfaces/collection';

describe('<CollectionList>', () => {
  describe('Deve renderizar uma lista de coleções em branco', () => {
    it('Deve exibir um elemento em branco quando uma lista de coleções vazia for injetada via prop', () => {
      const collections = [] as ICollection[];
      const { container } = render(<CollectionList collections={collections} />);//cria um array vazio collections, renderiza o componente <CollectionList /> passando a propriedade collections com o array vazio, e então usa a função 

      expect(container.firstChild).toBeEmptyDOMElement();//getByEmptyDOMElement para verificar se o elemento raiz do container está vazio
    });

    it('Deve exibir corretamente o nome de todas as coleções passadas via prop', () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection()
      );
      render(<CollectionList collections={collections} />);

      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());//Ele cria um array de coleções com tamanhos aleatórios, renderiza o componente <CollectionList /> passando a propriedade collections com o array de coleções, e então usa a função getByText para verificar se o nome de cada coleção está presente no documento
    });

    it('Deve renderizar o mesmo numero de coleções passadas via prop "collections"', () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection()
      );

      const { container } = render(<CollectionList collections={collections} />);

      expect(container.firstChild?.childNodes.length).toBe(collections.length);
    });
  });
});
