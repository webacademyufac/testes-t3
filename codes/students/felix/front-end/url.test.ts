import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {
    it('Deve retornar true quando uma URL válida for enviada', () => {
      // Gera uma URL válida usando o pacote faker
      const url = faker.image.urlPlaceholder();

      // Verifica se a propriedade isValid da instância é true
      expect(new ImageURL(url).isValid).toBe(true);
    });

    it('Deve retornar false quando uma URL inválida for enviada', () => {
      // Gera uma string aleatória que não é uma URL válida
      const url = faker.person.fullName();

      // Verifica se a propriedade isValid da instância é false
      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      // Define uma URL vazia
      const url = '';

      // Verifica se a propriedade isValid da instância é false
      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      // Define a URL padrão
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';

      // Define uma URL vazia
      const url = '';

      // Verifica se a propriedade url da instância é igual à URL padrão
      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL);
    });

    it('Deve retornar true quando a URL informada for uma URL estática da própria aplicação', () => {
      // Gera uma URL estática da aplicação usando a variável de ambiente NEXT_PUBLIC_DEV_URL
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`;

      // Cria uma instância de ImageURL com a URL gerada
      const imageURL = new ImageURL(url);

      // Verifica se a propriedade isValid da instância é true
      const isValid = imageURL.isValid;
      expect(isValid).toBe(true);
    });
  });
});
