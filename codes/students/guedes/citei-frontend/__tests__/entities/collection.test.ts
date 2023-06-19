// Importando as dependências e módulos necessários
import { Collection } from '../../src/entities/collection';
import { faker } from '@faker-js/faker';
import { ICollection } from '../../src/interfaces/collection';
import { ImageURL } from '../../src/entities/url';

describe('entities/collection', () => {
  describe('Deve retornar false quando uma coleção for instanciada com algum valor inválido', () => {
    it('Deve retornar false quando uma coleção for criada com o Título vazio', () => {
      
      // Definindo os dados de teste para a coleção
      const arrange: ICollection = {
        title: '',
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: faker.word.words(7),
      };

      // Criando uma instância de coleção com os dados de teste fornecidos
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Verificando se a propriedade isValid da instância de coleção é falsa
      expect(collection.isValid).toBe(false);
    });

    it('Deve retornar false quando uma coleção for criada com o subtítulo vazio', () => {
      
      // Definindo os dados de teste para a coleção
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: '',
      };

      // Criando uma instância de coleção com os dados de teste fornecidos
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Verificando se a propriedade isValid da instância de coleção é falsa
      expect(collection.isValid).toBe(false);
    });

    it('Deve retornar false quando uma coleção é criada com uma ImageURL inválida', () => {
      
      // Definindo os dados de teste para a coleção
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(''),
        subtitle: faker.word.words(7),
      };

      // Criando uma instância de coleção com os dados de teste fornecidos
      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      // Verificando se a propriedade isValid da instância de coleção é falsa
      expect(collection.isValid).toBe(false);
    });
  });

  it('Deve retornar o valor true na propriedade isValid quando uma coleção for criada com todos os valores válidos', () => {
    
    // Definindo os dados de teste para a coleção
    const arrange: ICollection = {
      title: faker.word.words(2),
      subtitle: faker.word.words(7),
      author: faker.person.fullName(),
      image: new ImageURL(faker.image.url()),
    };

    // Criando uma instância de coleção com os dados de teste fornecidos
    const collection = new Collection(
      arrange.title,
      arrange.author,
      arrange.subtitle,
      arrange.image
    );

    // Verificando se a propriedade isValid da instância de coleção é verdadeira
    expect(collection.isValid).toBe(true);
  });
});
