import { faker } from '@faker-js/faker';
import { ImageURL } from '../../src/entities/url';

describe('entities/url', () => {
  describe('isValid', () => {// Gera uma URL válida usando o pacote faker
    it('Deve retornar true quando uma URL válida for enviada', () => {
      const url = faker.image.urlPlaceholder();
      // Verifica se a propriedade isValid é true
      expect(new ImageURL(url).isValid).toBe(true);
    });
     // Gera uma string aleatória que não é uma URL válida e depois verifica se a propriedade isValid é false.
    it('Deve retornar false quando uma URL inválida for enviada', () => {
      const url = faker.person.fullName();

      expect(new ImageURL(url).isValid).toBe(false);
    });
    //Define uma URL vazia e vê se a propriedade isValid é false
    it('Deve retornar false quando uma URL for criada com uma string vazia', () => {
      const url = '';

      expect(new ImageURL(url).isValid).toBe(false);
    });
    // Define uma URL válida e outra vazia, depois faz a compraraçãõ da vazia com a válida e espera-se false
    it('Deve retornar a URL padrão quando uma URL inválida for enviada', () => {
      const DEFAULT_IMAGE_URL = 'https://i.ibb.co/ZHDSnj4/foo.jpg';
      const url = '';

      expect(new ImageURL(url).url).toBe(DEFAULT_IMAGE_URL);
    });
    //Pega a URL original, faz uma imagem dela e depois compara as duas, espera-se true
    it('Deve retornar true quando a URL informada for uma URL estatica da propria aplicação', () => {
      const url = `${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`;

      const isValid = new ImageURL(url).isValid;

      expect(isValid).toBe(true);
    })
  });
});
