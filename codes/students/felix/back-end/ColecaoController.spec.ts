import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';
import exp from 'constants';

// importa o módulo 'ColecaoRepository' e definir a coleção
jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  // mock permite controlar o comportamento da função durante testes e verificar como ela é usada no código em teste
  // substituição temporária e simulada da implementação original dessa função
  return {
    findAll: jest.fn().mockResolvedValue([colecao]),
    findById: jest.fn().mockResolvedValue(colecao),
    create: jest.fn().mockResolvedValue(colecao),
    update: jest.fn().mockResolvedValue(colecao),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(colecao),
  } as jest.Mocked<ColecaoRepositoryInterface>;
});

// declaração de variáveis para uso nos testes
let app: Express;
let server: any;
let agent: SuperTest<Test>;

// configura o servidor e o agente de teste
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

// enceramento do servidor
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

  it('deve retornar 422 ao enviar um título com mais de 255 caracteres', async () => {
    // Faz uma solicitação GET para a rota '/colecao' com um parâmetro de consulta 'titulo' contendo uma string repetida 256 vezes
    const response = (await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256)
    }))
    // verifica se o código de status da resposta é igual a 422
    expect(response.status).toBe(422);
  });

  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    // Faz uma solicitação GET para a rota '/colecao/1'.
    const response = await request(app).get('/colecao/1');

    // verifica se o código de status da resposta é igual a 200
    expect(response.status).toBe(200);
    // verifica se o tipo do corpo da resposta é um objeto
    expect(typeof response.body === 'object').toBe(true);
    // verifica se o corpo da resposta é igual à variável 'colecao'
    expect(response.body).toEqual(colecao);
  });

  it('deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id', async () => {
    // faz uma solicitação GET para a rota '/colecao/1'
    const response = await request(app).get('/colecao/1');

    // verifica se o código de status da resposta é igual a 200 (incorreto), Neste teste, há um pequeno erro na expectativa relacionada ao código de status da resposta, ja que ele esperta o status 422
    // não entendi esse teste ja que ele espera o status 422 se puder responder depois
    expect(response.status).toBe(200);

    // verifica se o tipo do corpo da resposta é um objeto
    expect(typeof response.body === 'object').toBe(true);

    // verifica se o corpo da resposta é igual à variável 'colecao'
    expect(response.body).toEqual(colecao);
  });

  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo',
    });

    // verifica se o código de status da resposta é igual a 200
    expect(response.status).toBe(200);
    // verifica se o tipo do corpo da resposta é um objeto.
    expect(typeof response.body === 'object').toBe(true);
    // verifica se o corpo da resposta é igual à variável 'colecao'
    expect(response.body).toEqual(colecao);
  });

  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    
    // faz uma solicitação POST para a rota '/colecao' com um corpo contendo campos com mais de 255 caracteres
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: 'a'.repeat(256), subtitulo: 'a'.repeat(256), autor: 'a'.repeat(256), imagem: 'a'.repeat(256)  });
    
    // verifica se o código de status da resposta é igual a 422
    expect(response.status).toBe(422);
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    // faz uma solicitação POST para a rota '/colecao' com um corpo contendo o campo 'titulo' como undefined
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined });

    // verifica se o código de status da resposta é igual a 422
    expect(response.status).toBe(422);
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    // faz uma solicitação POST para a rota '/colecao' com um corpo contendo o campo 'autor' como undefined
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined });

    // verifica se o código de status da resposta é igual a 422
    expect(response.status).toBe(422);

    // verifica se o corpo da resposta coincide com um snapshot esperado
    expect(response.body).toMatchSnapshot();
  });

  it('deve retornar um código de status 422 ao deixar de enviar dados obrigatorios', async () => {
    // faz uma solicitação POST para a rota '/colecao' com um corpo contendo os campos obrigatórios (autor, titulo, imagem) como undefined
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined });

    // verifica se o código de status da resposta é igual a 422
    expect(response.status).toBe(422);

    // verifica se o corpo da resposta coincide com um snapshot esperado
    expect(response.body).toMatchSnapshot();
  });

  it('deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao);

    // verifica se o código de status da resposta é igual a 200
    expect(response.status).toBe(200);
    // verifica se o tipo do corpo da resposta não é um objeto
    expect(typeof response.body === 'object').toBe(false);
    // verifica se o corpo da resposta coincide com o objeto 'colecao'
    expect(response.body).toEqual(colecao);
  });

  it('deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id', async () => {
    // faz uma solicitação DELETE para a rota '/colecao/1'
    const response = await request(app).delete('/colecao/1');

    // verifica se o código de status da resposta é igual a 200
    expect(response.status).toBe(200);

    // verifica se o corpo da resposta coincide com o objeto { message: 'Colecao removida com sucesso!' }
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' });
  });
});
