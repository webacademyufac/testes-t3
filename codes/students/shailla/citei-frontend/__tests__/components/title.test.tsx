import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import Title from '../../src/components/title';

describe('<Title>', () => {
  it('Deve renderizar o título com o valor passado no parâmetro do componente title', () => {
    const title = faker.lorem.sentence(); //gerou um titulo

    render(<Title>{title}</Title>); //renderização via texto

    expect(screen.getByText(title)).toBeInTheDocument(); //esperasse q o documento html esteja redenrizado, testa se o titulo realmente apareceu
  });
});
