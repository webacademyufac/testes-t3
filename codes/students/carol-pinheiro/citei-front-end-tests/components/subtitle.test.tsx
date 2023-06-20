import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import SubTitle from '../../src/components/subtitle';

describe('<SubTitle>', () => {
  it('Deve exibir o subtítulo com o valor passado no children', () => {//exibe corretamente o subtítulo quando o valor é passado como conteúdo da tag
    const subtitle = faker.lorem.sentence();

    render(<SubTitle>{subtitle}</SubTitle>);

    expect(screen.getByText(subtitle)).toBeInTheDocument();//O teste usa a função expect e a função getByText do screen para verificar se o texto do subtítulo está presente no documento.
  });
});
