import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../../src/components/modal';

describe('<Modal />', () => {
  describe('Deve renderizar o modal corretamente', () => {
    it('Deve esconder o modal quando ele for renderizado com a prop visible igual a false', () => {
      // Define a propriedade "visible" como false
      const visible = false;
      // Renderiza o componente Modal com a propriedade "visible" definida acima
      const { container } = render(<Modal visible={visible} />);

      // Verifica se o container está vazio, ou seja, se o modal está escondido
      expect(container).toBeEmptyDOMElement();
    });

    it('Deve exibir o modal quando ele for renderizado com a prop visible igual a true', () => {
      // Define a propriedade "visible" como true
      const visible = true;
      // Renderiza o componente Modal com a propriedade "visible" definida acima
      const { container } = render(<Modal visible={visible} />);

      // Verifica se o container não está vazio, ou seja, se o modal está sendo exibido
      expect(container).not.toBeEmptyDOMElement();
    });
  });
});
