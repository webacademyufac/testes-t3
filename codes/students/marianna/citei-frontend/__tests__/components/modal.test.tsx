import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../../src/components/modal';

describe('<Modal />', () => {
  describe('Deve renderizar o modal corretamente', () => {
    it('Deve esconder o modal quando ele for renderizado com a prop visible igual a false', () => {
      const visible = false;
      const { container } = render(<Modal visible={visible} />);

      expect(container).toBeEmptyDOMElement();       // Verifica se o container do modal está vazio quando a prop "visible" é false
    });

    it('Deve exibir o modal quando o ele for renderizado com a prop visible igual a true', () => {
      const visible = true;
      const { container } = render(<Modal visible={visible} />);

      expect(container).not.toBeEmptyDOMElement();       // Verifica se o container do modal não está vazio quando a prop "visible" é true
    });
  });
});
