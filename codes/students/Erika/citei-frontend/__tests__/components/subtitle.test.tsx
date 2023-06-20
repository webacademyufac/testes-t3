import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import SubTitle from '../../src/components/subtitle';

describe('<SubTitle>', () => {
  it('Deve exibir o subtítulo com o valor passado no children', () => {
    // Gerando um subtítulo aleatório
    const subtitle = faker.lorem.sentence();

    // Renderizando o componente SubTitle com o subtítulo gerado
    render(<SubTitle>{subtitle}</SubTitle>);

    // Verificando se o subtítulo está sendo exibido no documento
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });
});
