import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import Title from '../../src/components/title';

describe('<Title>', () => {
  it('Deve renderizar o título com o valor passado no parâmetro do componente title', () => {// Ele verifica se o componente <Title /> exibe corretamente o título quando o valor é passado como conteúdo da tag
    const title = faker.lorem.sentence();//é gerado um valor aleatório para o título usando a função faker.lorem.sentence() do pacote faker

    render(<Title>{title}</Title>);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
