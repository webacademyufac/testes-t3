import { Collection } from '../../src/entities/collection';
import { faker } from '@faker-js/faker';
import { ICollection } from '../../src/interfaces/collection';
import { ImageURL } from '../../src/entities/url';

// Descreve o conjunto de testes para a entidade Collection
describe('entities/collection', () => {
  // Descreve o conjunto de testes para verificar se uma coleção é instanciada com algum valor inválido
  describe('Deve retornar false quando uma coleção for instanciada com algum valor inválido', () => {
    // Teste: Deve retornar false quando uma coleção for criada com o Título vazio
    it('Deve retornar false quando uma coleção for criada com o Título vazio', () => {
      // Configuração inicial para o teste (arrange)
      const arrange: ICollection = {
        title: '',
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: faker.word.words(7),
      };

      // Criação da instância de Collection com os valores do arrange
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Verifica se a propriedade isValid da coleção é igual a false
      expect(collection.isValid).toBe(false);
    });

    // Teste: Deve retornar false quando uma coleção for criada com o subtítulo vazio
    it('Deve retornar false quando uma coleção for criada com o subtítulo vazio', () => {
      // Configuração inicial para o teste (arrange)
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: '',
      };

      // Criação da instância de Collection com os valores do arrange
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Verifica se a propriedade isValid da coleção é igual a false
      expect(collection.isValid).toBe(false);
    });

    // Teste: Deve retornar false quando uma coleção é criada com uma ImageURL inválida
    it('Deve retornar false quando uma coleção é criada com uma ImageURL inválida', () => {
      // Configuração inicial para o teste (arrange)
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(''),
        subtitle: faker.word.words(7),
      };

      // Criação da instância de Collection com os valores do arrange
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Verifica se a propriedade isValid da coleção é igual a false
      expect(collection.isValid).toBe(false);
    });
  });

  // Teste: Deve retornar o valor true na propriedade isValid quando uma coleção for criada com todos os valores válidos
  it('Deve retornar o valor true na propriedade isValid quando uma coleção for criada com todos os valores válidos', () => {
    // Configuração inicial para o teste (arrange)
    const arrange: ICollection = {
      title: faker.word.words(2),
      subtitle: faker.word.words(7),
      author: faker.person.fullName(),
      image: new ImageURL(faker.image.url()),
    };

    // Criação da instância de Collection com os valores do arrange
    const collection = new Collection(
      arrange.title,
      arrange.author,
      arrange.subtitle,
      arrange.image
    );

    // Verifica se a propriedade isValid da coleção é igual a true
    expect(collection.isValid).toBe(true);
  });
});
