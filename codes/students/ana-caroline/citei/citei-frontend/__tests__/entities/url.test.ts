import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {
    it('Deve retornar true quando uma URL válida for enviada', () => {
      // Gerando uma URL válida usando o faker
      const url = faker.image.urlPlaceholder();

      // Instanciando uma nova ImageURL com a URL gerada
      // e verificando se a URL é válida (deve retornar true)
      expect(new ImageURL(url).isValid).toBe(true);
    });

    it('Deve retornar false quando uma URL inválida for enviada', () => {
      // Gerando uma URL inválida usando o faker (uma string aleatória)
      const url = faker.person.fullName();

      // Instanciando uma nova ImageURL com a URL gerada
      // e verificando se a URL é inválida (deve retornar false)
      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      // Criando uma URL vazia
      const url = '';

      // Instanciando uma nova ImageURL com a URL vazia
      // e verificando se a URL é inválida (deve retornar false)
      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      // URL padrão para ser retornada quando a URL é inválida
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';

      // Criando uma URL inválida
      const url = '';

      // Instanciando uma nova ImageURL com a URL inválida
      // e verificando se a URL retornada é igual à URL padrão
      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL);
    });

    it('Deve retornar true quando a URL informada for uma URL estática da própria aplicação', () => {
      // Construindo uma URL estática da aplicação usando o NEXT_PUBLIC_DEV_URL
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`;

      // Instanciando uma nova ImageURL com a URL da aplicação
      // e verificando se a URL é válida (deve retornar true)
      const isValid = new ImageURL(url).isValid;

      expect(isValid).toBe(true);
    })
  });
});