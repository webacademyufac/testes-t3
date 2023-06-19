import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';
import exp from 'constants';

jest.mock('../../app/repositories/ColecaoRepository', () => {/*Preparacao do mock para ser usado */
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

beforeAll((done) => { // antes de iniciar de fato, prepara o servidor
  app = express();// inicializando o express

  app.use(cors()); //habilitando os cors
  app.use(express.json());// habilitando o express para recever os jsons
  app.use(ColecaoController.routes);// habilitando rotas

  server = app.listen(3000, () => { // iniciando o servidor
    agent = request.agent(server);
    done();
  });
});

afterAll((done) => { // depois de tudo, fecha o servidor
  server.close(done);
});

describe('ColecaoController', () => { // teste de ingrecao de colecaoController
  const colecao = {// preparando o obj estático que será usado ao decorrer dos testes
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  it('deve retornar 422 ao enviar um título com mais de 255 caracteres', async () => {
    const response = (await request(app).get('/colecao').query({ /*repete a letra A 256, passando do limite de 255*/
      titulo: 'a'.repeat(256)
    }))
    expect(response.status).toBe(422); /*Espera que o erro retornado seja o 422 */
  });

  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1');// realiza uma operacao get, determinada rota

    expect(response.status).toBe(200);//espera que o status seja OK
    expect(typeof response.body === 'object').toBe(true);// espera que o corpo  da resposta seja um objeto
    expect(response.body).toEqual(colecao);// espera que o retorno seja igual ao obj estático criado no inicio desta pilha de testes
  });

  it('deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1');// prepara a requisicao, para resposta recever um 200

    expect(response.status).toBe(200);// espera que o código  de retorno seja 200
    expect(typeof response.body === 'object').toBe(true);// espera que type corpo da resposta retornada seja do tipo objeto
    expect(response.body).toEqual(colecao);// espera que o obj seja igual ao criado no inicio da pilha de testes
  });

  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({// Simula uma inserssao no banco de dados
      titulo: 'titulo',
    });

    expect(response.status).toBe(200);//espera que seja um sucesso a operacao
    expect(typeof response.body === 'object').toBe(true);// espera que o type do retorno seja um obj 
    expect(response.body).toEqual(colecao);// espera que o obj seja igual ao obj estático criado no inicio da pilha de testes
  });

  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    /*Simula a insercao de um obj que ultrapassase os limites permidos */
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: 'a'.repeat(256), subtitulo: 'a'.repeat(256), autor: 'a'.repeat(256), imagem: 'a'.repeat(256)  });

    expect(response.status).toBe(422);// espera que o status seja 422
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined });// simula a insersao de um obj sem titulo

    expect(response.status).toBe(422);// espera que o status da resposta seja 422
  });

  it('deve retornar um código de status 422 ao deixar de enviar o titulo', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined });// simula a insersao de um obj sem autor

    expect(response.status).toBe(422);// espera que seja a resposta possua o status 422
    expect(response.body).toMatchSnapshot();//espera que as SnapShots batam
  });

  it('deve retornar um código de status 422 ao deixar de enviar dados obrigatorios', async () => {
    //simula a insersao de um obj sem autor,titulo e img
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined }); 

    expect(response.status).toBe(422);//espera um erro 422
    expect(response.body).toMatchSnapshot();//espera que as SnapShots batam
  });

  it('deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao); // simula um update no banco de dados

    expect(response.status).toBe(200);// espera que a operacao seja um sucesso
    expect(typeof response.body === 'object').toBe(false);// espera que o corpo do response não sej aum obj
    expect(response.body).toEqual(colecao);// espera que o corpo da requisicao seja igual ao obj colecao
  });

  it('deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id', async () => {
    const response = await request(app).delete('/colecao/1');// simula a operacao de delete no banco de dados

    expect(response.status).toBe(200); // espera que ela seja um sucesso
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' });// espera que a mensagem retornada seja igual a essa
  });
});
