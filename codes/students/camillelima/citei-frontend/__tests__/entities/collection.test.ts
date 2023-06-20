import { Collection } from '../../src/entities/collection';
import { faker } from '@faker-js/faker';
import { ICollection } from '../../src/interfaces/collection';
import { ImageURL } from '../../src/entities/url';

describe('entities/collection', () => {
  describe('Deve retornar false quando uma coleção for instanciada com algum valor invalido', () => {
    it('Deve retornar false quando uma coleção for criada com o Título vazio', () => {
      const arrange: ICollection = {
        title: '',
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: faker.word.words(7),
      };

      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      expect(collection.isValid).toBe(false);
    });

    it('Deve retornar false quando uma coleção for criada com o subtítulo vazio', () => {
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(faker.image.url()),
        subtitle: '',
      };

      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      expect(collection.isValid).toBe(false);
    });

    it('Deve retornar false quando uma coleção é criada com uma ImageURL invalida', () => {
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        image: new ImageURL(''),
        subtitle: faker.word.words(7),
      };

      const collection = new Collection(
        arrange.title,
        arrange.author,
        arrange.subtitle,
        arrange.image
      );

      expect(collection.isValid).toBe(false);
    });
  });

  it('Deve retornar o valor true na propriedade isValid quando uma coleção for criada com todos os valores válidos', () => {
    const arrange: ICollection = {
      title: faker.word.words(2),
      subtitle: faker.word.words(7),
      author: faker.person.fullName(),
      image: new ImageURL(faker.image.url()),
    };

    const collection = new Collection(
      arrange.title,
      arrange.author,
      arrange.subtitle,
      arrange.image
    );

    expect(collection.isValid).toBe(true);
  });
});

//Os primeiros três casos de teste verificam se a propriedade isValid da instância de Collection é false 
//quando a coleção é criada com um título vazio, um subtítulo vazio ou uma ImageURL inválida, respectivamente. 
//Cada caso de teste cria um objeto arrange contendo os valores dos parâmetros necessários para instanciar a 
//coleção e, em seguida, cria uma instância de Collection com esses valores.
//Após a criação da instância, é utilizada a asserção expect para verificar se a propriedade isValid da coleção 
//é false.
//O último caso de teste verifica se a propriedade isValid da instância de Collection é true quando a coleção 
//é criada com todos os valores válidos. Assim como nos casos anteriores, é criado um objeto arrange com valores
//válidos e, em seguida, é criada uma instância de Collection com esses valores. A asserção expect é utilizada 
//para verificar se a propriedade isValid da coleção é true.