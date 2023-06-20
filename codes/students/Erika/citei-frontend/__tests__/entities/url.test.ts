import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {
    it('Deve retornar true quando uma URL válida for enviada', () => {
      // Gerando uma URL válida usando o faker
      const url = faker.image.urlPlaceholder();

      // Verificando se a URL é válida (isValid = true)
      expect(new ImageURL(url).isValid).toBe(true);
    });

    it('Deve retornar false quando uma URL inválida for enviada', () => {
      // Gerando uma URL inválida usando o faker (um nome de pessoa)
      const url = faker.person.fullName();

      // Verificando se a URL é inválida (isValid = false)
      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      // Criando uma URL vazia
      const url = '';

      // Verificando se a URL é inválida (isValid = false)
      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      // URL padrão para caso a URL seja inválida
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';

      // Criando uma URL inválida
      const url = '';

      // Verificando se a URL criada é igual à URL padrão
      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL);
    });

    it('Deve retornar true quando a URL informada for uma URL estática da própria aplicação', () => {
      // Gerando uma URL estática da aplicação usando a variável de ambiente NEXT_PUBLIC_DEV_URL
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`;

      // Verificando se a URL é válida (isValid = true)
      const isValid = new ImageURL(url).isValid;
      expect(isValid).toBe(true);
    });
  });
});
