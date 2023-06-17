import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {
    it('Deve retornar true quando uma URL válida for enviada', () => {//O primeiro teste verifica se a função isValid retorna true quando uma URL válida é enviada. Ele gera uma URL válida usando o faker, instancia a classe ImageURL passando a URL como argumento e então verifica se a propriedade isValid da instância é igual a true.
      const url = faker.image.urlPlaceholder();

      expect(new ImageURL(url).isValid).toBe(true);
    });

    it('Deve retornar false quando uma URL inválida for enviada', () => {//O segundo teste verifica se a função isValid retorna false quando uma URL inválida é enviada. Ele gera uma string inválida usando o faker, instancia a classe ImageURL passando a string como argumento e então verifica se a propriedade isValid da instância é igual a false.
      const url = faker.person.fullName();

      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {//O terceiro teste verifica se a função isValid retorna false quando uma URL vazia é enviada. Ele define uma string vazia como a URL, instancia a classe ImageURL passando a string vazia como argumento e então verifica se a propriedade isValid da instância é igual a false.

      const url = '';

      expect(new ImageURL(url).isValid).toBe(false);
    });

    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {//O quarto teste verifica se a função url retorna a URL padrão quando uma URL inválida é enviada. Ele define uma string vazia como a URL, instancia a classe ImageURL passando a string vazia como argumento e então verifica se o valor retornado pela propriedade url da instância é igual à URL padrão especificada.
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';
      const url = '';

      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL);
    });

    it('Deve retornar true quando a URL informada for uma URL estatica da propria aplicação', () => {//O quinto teste verifica se a função isValid retorna true quando a URL informada é uma URL estática da própria aplicação. Ele define uma URL estática válida usando a variável de ambiente process.env.NEXT_PUBLIC_DEV_URL, instancia a classe ImageURL passando a URL como argumento e então verifica se a propriedade isValid da instância é igual a true.
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`;

      const isValid = new ImageURL(url).isValid;

      expect(isValid).toBe(true);
    })
  });
});
