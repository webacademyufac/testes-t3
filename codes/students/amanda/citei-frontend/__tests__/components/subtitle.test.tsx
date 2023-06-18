import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import SubTitle from '../../src/components/subtitle';

//O teste garante que o componente SubTitle está se comportando corretamente e exibindo o texto passado no children corretamente

describe('<SubTitle>', () => {
  it('Deve exibir o subtítulo com o valor passado no children', () => {
    const subtitle = faker.lorem.sentence();

    render(<SubTitle>{subtitle}</SubTitle>);

    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });
});
