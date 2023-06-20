import request, { SuperTest, Test } from 'supertest'; // Importação das bibliotecas 'supertest' para fazer requisições HTTP
import express, { Express } from 'express'; // Importação da biblioteca 'express' para criar o servidor
import cors from 'cors'; // Importação da biblioteca 'cors' para lidar com as requisições CORS
import ColecaoController from '../../app/controllers/ColecaoController'; // Importação do controlador da coleção
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface'; // Importação da interface do repositório de coleção
import exp from 'constants';

jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  return {
    findAll: jest.fn().mockResolvedValue([colecao]), // Mock para a função findAll, que retorna uma lista de coleções
    findById: jest.fn().mockResolvedValue(colecao), // Mock para a função findById, que retorna uma coleção por ID
    create: jest.fn().mockResolvedValue(colecao), // Mock para a função create, que cria uma nova coleção
    update: jest.fn().mockResolvedValue(colecao), // Mock para a função update, que atualiza uma coleção
    delete: jest.fn(), // Mock para a função delete, que deleta uma coleção
    getColecaoOnly: jest.fn().mockResolvedValue(colecao), // Mock para a função getColecaoOnly, que retorna uma coleção específica
  } as jest.Mocked<ColecaoRepositoryInterface>;
});

let app: Express;
let server: any;
let agent: SuperTest<Test>;

beforeAll((done) => {
  app = express(); // Inicializa o servidor Express

  app.use(cors()); // Habilita o CORS para as requisições
  app.use(express.json()); // Habilita o parsing de JSON nas requisições
  app.use(ColecaoController.routes); // Adiciona as rotas do controlador da coleção ao servidor Express

  server = app.listen(3000, () => { // Inicia o servidor na porta 3000
    agent = request.agent(server); // Cria um agente SuperTest para fazer as requisições ao servidor
    done();
  });
});

afterAll((done) => {
  server.close(done); // Encerra o servidor após todos os testes serem executados
});

describe('ColecaoController', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  it('deve retornar 422 ao enviar um título com mais de 255 caracteres', async () => {
    const response = (await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256) // Envia uma requisição GET para /colecao com um título de mais de 255 caracteres
    }))
    expect(response.status).toBe(422); // Verifica se o status da resposta é 422
  });

  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1'); // Envia uma requisição GET para /colecao/1

    expect(response.status).toBe(200); // Verifica se o status da resposta é 200
    expect(typeof response.body === 'object').toBe(true); // Verifica se o corpo da resposta é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o corpo da resposta é igual à colecao definida
  });

  it('deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1'); // Envia uma requisição GET para /colecao/1

    expect(response.status).toBe(200); // Verifica se o status da resposta é 200
    expect(typeof response.body === 'object').toBe(true); // Verifica se o corpo da resposta é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o corpo da resposta é igual à colecao definida
  });

  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo', // Envia uma requisição POST para /colecao com um objeto colecao contendo apenas o título
    });

    expect(response.status).toBe(200); // Verifica se o status da resposta é 200
    expect(typeof response.body === 'object').toBe(true); // Verifica se o corpo da resposta é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o corpo da resposta é igual à colecao definida
  });

  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: 'a'.repeat(256), subtitulo: 'a'.repeat(256), autor: 'a'.repeat(256), imagem: 'a'.repeat(256)  });
    // Envia uma requisição POST para /colecao com um objeto colecao contendo campos com mais de 255 caracteres

    expect(response.status).toBe(422); // Verifica se o status da resposta é 422
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined });
    // Envia uma requisição POST para /colecao com um objeto colecao sem o campo título

    expect(response.status).toBe(422); // Verifica se o status da resposta é 422
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined });
    // Envia uma requisição POST para /colecao com um objeto colecao sem o campo autor

    expect(response.status).toBe(422); // Verifica se o status da resposta é 422
    expect(response.body).toMatchSnapshot(); // Verifica se o corpo da resposta coincide com o snapshot esperado
  });

  it('deve retornar um código de status 422 ao deixar de enviar dados obrigatorios', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined });
    // Envia uma requisição POST para /colecao com um objeto colecao sem os campos obrigatórios

    expect(response.status).toBe(422); // Verifica se o status da resposta é 422
    expect(response.body).toMatchSnapshot(); // Verifica se o corpo da resposta coincide com o snapshot esperado
  });

  it('deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao);
    // Envia uma requisição PUT para /colecao/1 com o objeto colecao

    expect(response.status).toBe(200); // Verifica se o status da resposta é 200
    expect(typeof response.body === 'object').toBe(false); // Verifica se o corpo da resposta não é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o corpo da resposta é igual à colecao definida
  });

  it('deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id', async () => {
    const response = await request(app).delete('/colecao/1');
    // Envia uma requisição DELETE para /colecao/1

    expect(response.status).toBe(200); // Verifica se o status da resposta é 200
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' });
    // Verifica se o corpo da resposta é igual à mensagem de sucesso esperada
  });
});
