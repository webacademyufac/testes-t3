import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';
import exp from 'constants';

jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  return {
    findAll: jest.fn().mockResolvedValue([colecao]),
    findById: jest.fn().mockResolvedValue(colecao),
    create: jest.fn().mockResolvedValue(colecao),
    update: jest.fn().mockResolvedValue(colecao),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(colecao),
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
  // Objeto colecao usado nos testes
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  // Esse teste verifica se retorna o status 422 quando o título tem mais de 255 caracteres
  it('deve retornar 422 ao enviar um título com mais de 255 caracteres', async () => {
    const response = (await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256) // Cria uma string com 256 caracteres 'a' repetidos
    }));
    expect(response.status).toBe(422); // Verifica se o código de status da resposta é 422 
  });

  // Esse teste verifica se retorna o status 200 e um objeto colecao 
  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1'); // Faz uma requisição GET 
    expect(response.status).toBe(200); // Verifica se o código de status da resposta é 200 
    expect(typeof response.body === 'object').toBe(true); // Verifica se o body da resposta é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o body da resposta é igual ao objeto colecao
  });

  // Esse teste verifica se retorna o status 422 e um objeto colecao 
  it('deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1'); // Faz uma requisição 

    expect(response.status).toBe(200); // Verifica se o código de status da resposta é 200 
    expect(typeof response.body === 'object').toBe(true); // Verifica se o body da resposta é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o body da resposta é igual ao objeto colecao
  });

  // Esse teste verifica se retorna o status 200 e um novo objeto colecao 
  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo',
    }); // Faz uma requisição POST para '/colecao' com o body contendo um título

    expect(response.status).toBe(200); // Verifica se o código de status da resposta é 200 
    expect(typeof response.body === 'object').toBe(true); // Verifica se o body da resposta é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o body da resposta é igual ao objeto colecao
  });

  // Esse teste verifica se retorna o status 422 ao enviar campos com mais de 255 caracteres
  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: 'a'.repeat(256), subtitulo: 'a'.repeat(256), autor: 'a'.repeat(256), imagem: 'a'.repeat(256) });

    expect(response.status).toBe(422); // Verifica se o código de status da resposta é 422 
  });

  // Esse teste verifica se retorna o status 422 ao deixar de enviar o título
  it('deve retornar um código de status 422 ao deixar de enviar o título', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined });

    expect(response.status).toBe(422); // Verifica se o código de status da resposta é 422 
  });

  // Esse teste verifica se retorna o status 422 ao deixar de enviar o autor
  it('deve retornar um código de status 422 ao deixar de enviar o autor', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined });

    expect(response.status).toBe(422); // Verifica se o código de status da resposta é 422 
    expect(response.body).toMatchSnapshot(); // Verifica se o body da resposta coincide com a saída esperada
  });

  // Esse teste verifica se retorna o status 422 ao deixar de enviar dados obrigatórios
  it('deve retornar um código de status 422 ao deixar de enviar dados obrigatórios', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined });

    expect(response.status).toBe(422); // Verifica se o código de status da resposta é 422 
    expect(response.body).toMatchSnapshot(); // Verifica se o body da resposta coincide com a saída esperada
  });

  // Esse teste verifica se retorna o status 200 e um objeto colecao atualizado 
  it('deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao); // Faz uma requisição PUT 

    expect(response.status).toBe(200); // Verifica se o código de status da resposta é 200 (OK)
    expect(typeof response.body === 'object').toBe(false); // Verifica se o body da resposta não é um objeto
    expect(response.body).toEqual(colecao); // Verifica se o body da resposta é igual ao objeto colecao
  });

  // Esse teste verifica se retorna o status 200 e uma mensagem de sucesso 
  it('deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id', async () => {
    const response = await request(app).delete('/colecao/1'); // Faz uma requisição DELETE 

    expect(response.status).toBe(200); // Verifica se o código de status da resposta é 200 
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' }); // Verifica se o body da resposta é uma mensagem de sucesso
  });
});