import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';
import exp from 'constants';

// Simula o comportamento do ColecaoRepository
jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  return {
    findAll: jest.fn().mockResolvedValue([colecao]), // Mock para findAll retornando um array de coleções
    findById: jest.fn().mockResolvedValue(colecao), // Mock para findById retornando uma coleção específica
    create: jest.fn().mockResolvedValue(colecao), // Mock para create retornando uma nova coleção
    update: jest.fn().mockResolvedValue(colecao), // Mock para update retornando a coleção atualizada
    delete: jest.fn(), // Mock para delete
    getColecaoOnly: jest.fn().mockResolvedValue(colecao), // Mock para getColecaoOnly retornando uma coleção específica
  } as jest.Mocked<ColecaoRepositoryInterface>;
});

let app: Express;
let server: any;
let agent: SuperTest<Test>;

beforeAll((done) => {
  app = express();

  app.use(cors());
  app.use(express.json());
  app.use(ColecaoController.routes);

  server = app.listen(3000, () => {
    agent = request.agent(server);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('ColecaoController', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  // Teste para verificar se um título com mais de 255 caracteres retorna status 422
  it('deve retornar 422 ao enviar um título com mais de 255 caracteres', async () => {
    const response = await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256)
    });
    expect(response.status).toBe(422);
  });

  // Teste para verificar se GET /colecao/:id retorna status 200 OK e um objeto colecao
  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1');

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });

  // Teste para verificar se POST /colecao retorna status 200 OK e um novo objeto colecao
  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo',
    });

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });


  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: 'a'.repeat(256), subtitulo: 'a'.repeat(256), autor: 'a'.repeat(256), imagem: 'a'.repeat(256)  });

    expect(response.status).toBe(422);
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined });

    expect(response.status).toBe(422);
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined });

    expect(response.status).toBe(422);
    expect(response.body).toMatchSnapshot();
  });

  it('deve retornar um código de status 422 ao deixar de enviar dados obrigatorios', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined });

    expect(response.status).toBe(422);
    expect(response.body).toMatchSnapshot();
  });

  it('deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao);

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(false);
    expect(response.body).toEqual(colecao);
  });

  it('deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id', async () => {
    const response = await request(app).delete('/colecao/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' });
  });
});
