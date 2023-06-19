import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import SubTitle from '../../src/components/subtitle';

describe('<SubTitle>', () => {
  it('Deve exibir o subtítulo com o valor passado no children', () => {
    const subtitle = faker.lorem.sentence(); // Gera um subtítulo falso usando o faker

    render(<SubTitle>{subtitle}</SubTitle>); // Renderiza o componente SubTitle com o subtítulo como conteúdo

    expect(screen.getByText(subtitle)).toBeInTheDocument(); // Verifica se o subtítulo está presente no documento renderizado
  });
});
