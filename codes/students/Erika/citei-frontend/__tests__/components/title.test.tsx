import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import Title from '../../src/components/title';

describe('<Title>', () => {
  it('Deve renderizar o título com o valor passado no parâmetro do componente title', () => {
    // Gerando um título aleatório
    const title = faker.lorem.sentence();

    // Renderizando o componente Title com o título gerado
    render(<Title>{title}</Title>);

    // Verificando se o título está sendo exibido no documento
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
