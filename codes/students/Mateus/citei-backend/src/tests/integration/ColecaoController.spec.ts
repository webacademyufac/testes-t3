import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';
import exp from 'constants';
//Serve para importar o ColecaoRepository e definir do que essa coleção é composta
jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };
 // O mock controla o comportamento da função durante testes e verifica como atua no código de teste
  return {
    findAll: jest.fn().mockResolvedValue([colecao]),
    findById: jest.fn().mockResolvedValue(colecao),
    create: jest.fn().mockResolvedValue(colecao),
    update: jest.fn().mockResolvedValue(colecao),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(colecao),
  } as jest.Mocked<ColecaoRepositoryInterface>;
});
//Declaração de váriaveis pros testes
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
//Encerra o servidor
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
  // Faz uma solicitação GET para '/colecao' com 'titulo' como parametro de consulta, contendo uma string e ao final verifica se o status retornado é de 422
  it('deve retornar 422 ao enviar um título com mais de 255 caracteres', async () => {
    const response = (await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256)
    }))
    expect(response.status).toBe(422);
  });
   // Faz uma solicitação GET para '/colecao/1', se o status for igual a 200 retorna OK e por último verifica se a variavel resposta é um objeto e se esse objeto é igual a variavel coleção
  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1');

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });
  //Diferente do teste anterior esse espera o erro 422
  it('deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1');

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });
  // Ele verifica se o status for igual a 200 retorna OK e por último verifica se a variavel resposta é um objeto e se esse objeto é igual a variavel coleção
  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo',
    });

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });
  // Faz uma requisição POST para a rota '/colecao' com um corpo contendo uma string maior que o normal e se o status de retorno é igual a 422
  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: 'a'.repeat(256), subtitulo: 'a'.repeat(256), autor: 'a'.repeat(256), imagem: 'a'.repeat(256)  });

    expect(response.status).toBe(422);
  });
  //Faz a mesma coisa que o teste anterior, mas inves de mandar uma string maior que o normal, anda um titulo indefinido
  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined });

    expect(response.status).toBe(422);
  });
  //Faz a mesma coisa que o teste anterior, exceto que envia o autor como indefinido e verifica se a resposta é um snapshot esperado
  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined });

    expect(response.status).toBe(422);
    expect(response.body).toMatchSnapshot();
  });
  // Faz uma solicitação POST para '/colecao' com um corpo contendo os campos obrigatórios (autor, titulo, imagem) como campos indefinidos, verifica se o status é 422 e verifica se a resposta é um snapshot esperado
  it('deve retornar um código de status 422 ao deixar de enviar dados obrigatorios', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined });

    expect(response.status).toBe(422);
    expect(response.body).toMatchSnapshot();
  });
// Verifica se o status da resposta é 200, se o tipo de resposta não é um objeto e se o corpo da resposta coincide com o objeto 'colecao'
  it('deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao);

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(false);
    expect(response.body).toEqual(colecao);
  });
  // Faz uma solicitação DELETE para '/colecao/1', ai verifica se o código de status é 200 e verifica se o corpo da resposta coincide com o objeto { message: 'Colecao removida com sucesso!' }
  it('deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id', async () => {
    const response = await request(app).delete('/colecao/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' });
  });
});
