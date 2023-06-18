import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../../src/components/modal';

//Os testes deste estão verificando se o componente está se comportando corretamente ao lidar com a propriedade "visible", que é responsável por controlar se o modal deve ser exibido ou não na tela
//O teste garante que o componente Modal está agindo de acordo com o valor passado para a proprievedade "visible" em diferentes situações

describe('<Modal />', () => {
  describe('Deve renderizar o modal corretamente', () => {
    it('Deve esconder o modal quando ele for renderizado com a prop visible igual a false', () => {
      const visible = false;
      const { container } = render(<Modal visible={visible} />);

      expect(container).toBeEmptyDOMElement();
    });

    it('Deve exibir o modal quando o ele for renderizado com a prop visible igual a true', () => {
      const visible = true;
      const { container } = render(<Modal visible={visible} />);

      expect(container).not.toBeEmptyDOMElement();
    });
  });
});
