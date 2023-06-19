import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {
    it('Deve retornar true quando uma URL válida for enviada', () => {
      // Gerando uma URL válida usando o módulo 'faker'
      const url = faker.image.urlPlaceholder();

      // Criando uma instância de 'ImageURL' com a URL gerada e verificando se é válida
      expect(new ImageURL(url).isValid).toBe(true);
    });

    it('Deve retornar false quando uma URL inválida for enviada', () => {
      // Gerando uma URL inválida usando o nome completo de uma pessoa gerado pelo 'faker'
      const url = faker.person.fullName(); 

      // Criando uma instância de 'ImageURL' com a URL gerada e verificando se é inválida
      expect(new ImageURL(url).isValid).toBe(false); // Criando uma instância de 'ImageURL' com a URL gerada e verificando se é inválida
    });

    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      const url = '';

      // Criando uma instância de 'ImageURL' com a URL vazia e verificando se é inválida
      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      // Definindo uma URL de imagem padrão
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';
      const url = '';

      // Criando uma instância de 'ImageURL' com a URL vazia e verificando se retorna a URL de imagem padrão
      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL); 
    });

    it('Deve retornar true quando a URL informada for uma URL estática da própria aplicação', () => {
      // Criando uma URL usando a variável de ambiente 'NEXT_PUBLIC_DEV_URL' e um caminho específico
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`; 

      // Criando uma instância de 'ImageURL' com a URL gerada e verificando se é válida
      const isValid = new ImageURL(url).isValid; 

      // Verificando se a URL é válida
      expect(isValid).toBe(true); 
    })
  });
});
