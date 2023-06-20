import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {
    it('Deve retornar true quando uma URL válida for enviada', () => {
      const url = faker.image.urlPlaceholder();

      expect(new ImageURL(url).isValid).toBe(true);
    });

    it('Deve retornar false quando uma URL inválida for enviada', () => {
      const url = faker.person.fullName();

      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      const url = '';

      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';
      const url = '';

      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL);
    });

    it('Deve retornar true quando a URL informada for uma URL estatica da propria aplicação', () => {
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`;

      const isValid = new ImageURL(url).isValid;

      expect(isValid).toBe(true);
    })
  });
});

//Este conjunto de testes verifica se a classe ImageURL valida corretamente as URLs fornecidas e 
//se retorna os valores esperados para as propriedades isValid e url. Os casos de teste cobrem cenários 
//de URLs válidas, URLs inválidas, string vazia e URL estática da própria aplicação.