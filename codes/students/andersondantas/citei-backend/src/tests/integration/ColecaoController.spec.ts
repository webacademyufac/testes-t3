// Importa as bibliotecas e módulos necessários
import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';

// Simula o módulo '../../app/repositories/ColecaoRepository' usando jest.mock
jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  return {
    // Simula a função findAll do repositório com um mock que retorna uma promessa resolvida contendo um array com a coleção
    findAll: jest.fn().mockResolvedValue([colecao]),
    // Simula a função findById do repositório com um mock que retorna uma promessa resolvida contendo a coleção
    findById: jest.fn().mockResolvedValue(colecao),
    // Simula a função create do repositório com um mock que retorna uma promessa resolvida contendo a coleção
    create: jest.fn().mockResolvedValue(colecao),
    // Simula a função update do repositório com um mock que retorna uma promessa resolvida contendo a coleção
    update: jest.fn().mockResolvedValue(colecao),
    // Simula a função delete do repositório que não retorna um valor
    delete: jest.fn(),
    // Simula a função getColecaoOnly do repositório com um mock que retorna uma promessa resolvida contendo a coleção
    getColecaoOnly: jest.fn().mockResolvedValue(colecao),
  } as jest.Mocked<ColecaoRepositoryInterface>;
});

let app: Express;
let server: any;
let agent: SuperTest<Test>;

// Executa antes de todos os testes
beforeAll((done) => {
  app = express();

  // Configura o aplicativo Express
  app.use(cors());
  app.use(express.json());
  app.use(ColecaoController.routes);

  // Inicia o servidor e agente de teste
  server = app.listen(3000, () => {
    agent = request.agent(server);
    done();
  });
});

// Executa após todos os testes
afterAll((done) => {
  server.close(done);
});

// Descreve o grupo de testes para o controlador ColecaoController
describe('ColecaoController', () => {
  // Define um objeto colecao que representa uma coleção
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  // Teste: deve retornar 422 ao enviar um título com mais de 255 caracteres
  it('deve retornar 422 ao enviar um título com mais de 255 caracteres', async () => {
    const response = (await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256)
    }))

    expect(response.status).toBe(422);
  });

  // Teste: deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id
  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1');

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });

  // Teste: deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id
  it('deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1');

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });

  // Teste: deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao
  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo',
    });

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });

  // Teste: deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres
  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: 'a'.repeat(256), subtitulo: 'a'.repeat(256), autor: 'a'.repeat(256), imagem: 'a'.repeat(256)  });

    expect(response.status).toBe(422);
  });

  // Teste: deve retornar um código de status 422 ao deixar de enviar o titulo
  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined });

    expect(response.status).toBe(422);
  });

  // Teste: deve retornar um código de status 422 ao deixar de enviar o autor
  it('deve retornar um código de status 422 ao deixar de enviar o autor', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined });

    expect(response.status).toBe(422);
    expect(response.body).toMatchSnapshot();
  });

  // Teste: deve retornar um código de status 422 ao deixar de enviar dados obrigatórios
  it('deve retornar um código de status 422 ao deixar de enviar dados obrigatórios', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined });

    expect(response.status).toBe(422);
    expect(response.body).toMatchSnapshot();
  });

  // Teste: deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id
  it('deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao);

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(false);
    expect(response.body).toEqual(colecao);
  });

  // Teste: deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id
  it('deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id', async () => {
    const response = await request(app).delete('/colecao/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' });
  });
});
