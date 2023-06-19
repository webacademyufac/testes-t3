import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import Title from '../../src/components/title';

describe('<Title>', () => {
  it('Deve renderizar o título com o valor passado no parâmetro do componente title', () => {
    const title = faker.lorem.sentence(); // Gera um título falso usando o faker

    render(<Title>{title}</Title>); // Renderiza o componente Title com o título como conteúdo

    expect(screen.getByText(title)).toBeInTheDocument(); // Verifica se o título está presente no documento renderizado
  });
});
