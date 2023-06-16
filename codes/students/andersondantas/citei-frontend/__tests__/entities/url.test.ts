import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

// Descreve o conjunto de testes para a entidade URL
describe('entities/url', () => {
  // Descreve o conjunto de testes para verificar a propriedade isValid
  describe('isValid', () => {
    // Teste: Deve retornar true quando uma URL válida for enviada
    it('Deve retornar true quando uma URL válida for enviada', () => {
      // Gera uma URL válida usando o faker
      const url = faker.image.urlPlaceholder();

      // Cria uma instância de ImageURL com a URL gerada
      const imageURL = new ImageURL(url);

      // Verifica se a propriedade isValid da instância é igual a true
      expect(imageURL.isValid).toBe(true);
    });

    // Teste: Deve retornar false quando uma URL inválida for enviada
    it('Deve retornar false quando uma URL inválida for enviada', () => {
      // Gera uma URL inválida usando o faker (uma string que não representa uma URL)
      const url = faker.person.fullName();

      // Cria uma instância de ImageURL com a URL gerada
      const imageURL = new ImageURL(url);

      // Verifica se a propriedade isValid da instância é igual a false
      expect(imageURL.isValid).toBe(false);
    });

    // Teste: Deve retornar false quando uma URL for criada com uma string vazia
    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      // URL vazia
      const url = '';

      // Cria uma instância de ImageURL com a URL vazia
      const imageURL = new ImageURL(url);

      // Verifica se a propriedade isValid da instância é igual a false
      expect(imageURL.isValid).toBe(false);
    });

    // Teste: Deve retornar a URL padrão quando uma URL inválida for enviada
    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      // URL inválida
      const url = '';

      // URL padrão a ser retornada quando a URL é inválida
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';

      // Cria uma instância de ImageURL com a URL inválida
      const imageURL = new ImageURL(url);

      // Verifica se a propriedade url da instância é igual à URL padrão
      expect(imageURL.url).toBe(DEFAULT_IMAGE_URL);
    });

    // Teste: Deve retornar true quando a URL informada for uma URL estática da própria aplicação
    it('Deve retornar true quando a URL informada for uma URL estática da própria aplicação', () => {
      // URL estática da própria aplicação
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`;

      // Cria uma instância de ImageURL com a URL da aplicação
      const imageURL = new ImageURL(url);

      // Verifica se a propriedade isValid da instância é igual a true
      const isValid = imageURL.isValid;
      expect(isValid).toBe(true);
    });
  });
});
