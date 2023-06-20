import { Collection } from './src/entities/collection';
import { faker } from '@faker-js/faker';
import { ICollection } from './src/interfaces/collection';
import { ImageURL } from './src/entities/url';

describe('entities/collection', () => {
  describe('Deve retornar false quando uma coleção for instanciada com algum valor invalido', () => {
    it('Deve retornar false quando uma coleção for criada com o Título vazio', () => {
      // Arrange: Define um objeto de coleção com título vazio e outros valores válidos usando o faker-js
      const arrange: ICollection = {
        title: '',
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: faker.word.words(7),
      };

      // Act: Cria uma instância da classe Collection com os valores do objeto de coleção
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Assert: Verifica se a propriedade isValid da coleção é igual a false
      expect(collection.isValid).toBe(false);
    });

    it('Deve retornar false quando uma coleção for criada com o subtítulo vazio', () => {
      // Arrange: Define um objeto de coleção com subtítulo vazio e outros valores válidos usando o faker-js
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: '',
      };

      // Act: Cria uma instância da classe Collection com os valores do objeto de coleção
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Assert: Verifica se a propriedade isValid da coleção é igual a false
      expect(collection.isValid).toBe(false);
    });

    it('Deve retornar false quando uma coleção é criada com uma ImageURL inválida', () => {
      // Arrange: Define um objeto de coleção com uma ImageURL vazia e outros valores válidos usando o faker-js
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(''),
        subtitle: faker.word.words(7),
      };

      // Act: Cria uma instância da classe Collection com os valores do objeto de coleção
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Assert: Verifica se a propriedade isValid da coleção é igual a false
      expect(collection.isValid).toBe(false);
    });
  });

  it('Deve retornar o valor true na propriedade isValid quando uma coleção for criada com todos os valores válidos', () => {
    // Arrange: Define um objeto de coleção com todos os valores válidos usando o faker-js
    const arrange: ICollection = {
      title: faker.word.words(2),
      subtitle: faker.word.words(7),
      author: faker.person.fullName(),
      image: new ImageURL(faker.image.url()),
    };

    // Act: Cria uma instância da classe Collection com os valores do objeto de coleção
    const collection = new Collection(
      arrange.title,
      arrange.author,
      arrange.subtitle,
      arrange.image
    );

    // Assert: Verifica se a propriedade isValid da coleção é igual a true
    expect(collection.isValid).toBe(true);
  });
});
