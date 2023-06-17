import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../../src/components/modal';

describe('<Modal />', () => {
  describe('Deve renderizar o modal corretamente', () => {
    it('Deve esconder o modal quando ele for renderizado com a prop visible igual a false', () => { //verifica se o modal está oculto quando é renderizado com a propriedade visible igual a false
      const visible = false;//variavel visible é false
      const { container } = render(<Modal visible={visible} />);

      expect(container).toBeEmptyDOMElement();
    });

    it('Deve exibir o modal quando o ele for renderizado com a prop visible igual a true', () => {//Ele verifica se o modal é exibido quando é renderizado com a propriedade visible igual a true.
      const visible = true;//diferente do teste acima, a visible aqui é true, outra forma de testar
      const { container } = render(<Modal visible={visible} />);

      expect(container).not.toBeEmptyDOMElement();
    });
  });
});
