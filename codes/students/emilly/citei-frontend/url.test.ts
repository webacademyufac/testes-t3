import { faker } from '@faker-js/faker';
import { ImageURL } from './src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {
    it('Deve retornar true quando uma URL válida for enviada', () => {
      const url = faker.image.urlPlaceholder(); // Gera uma URL válida usando o faker

      expect(new ImageURL(url).isValid).toBe(true); // Verifica se a propriedade isValid da URL é igual a true
    });

    it('Deve retornar false quando uma URL inválida for enviada', () => {
      const url = faker.person.fullName(); // Gera uma URL inválida usando o faker

      expect(new ImageURL(url).isValid).toBe(false); // Verifica se a propriedade isValid da URL é igual a false
    });

    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      const url = ''; // URL vazia

      expect(new ImageURL(url).isValid).toBe(false); // Verifica se a propriedade isValid da URL é igual a false
    });

    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg'; // URL padrão
      const url = ''; // URL vazia

      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL); // Verifica se a propriedade url da URL é igual à URL padrão
    });

    it('Deve retornar true quando a URL informada for uma URL estática da própria aplicação', () => {
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`; // URL estática da aplicação

      const isValid = new ImageURL(url).isValid; // Obtém o valor da propriedade isValid da URL

      expect(isValid).toBe(true); // Verifica se isValid é igual a true
    });
  });
});
