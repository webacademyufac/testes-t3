import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';

// Mock do módulo ColecaoRepository
jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  return {
    // Mock das funções do repositório de coleções
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
  // Configuração do servidor de teste
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
  // Encerramento do servidor de teste
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
    // Teste do endpoint GET /colecao com um título muito longo
    const response = await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256)
    });

    expect(response.status).toBe(422);
  });

  it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
    // Teste do endpoint GET /colecao/:id
    const response = await request(app).get('/colecao/1');

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });

  it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
    // Teste do endpoint POST /colecao para criar uma nova coleção
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo',
    });

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });

  it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
    // Teste do endpoint POST /colecao com campos muito longos
    const response = await request(app).post('/colecao').send({
      ...colecao,
      titulo: 'a'.repeat(256),
      subtitulo: 'a'.repeat(256),
      autor: 'a'.repeat(256),
      imagem: 'a'.repeat(256)
    });

   
    import request, { SuperTest, Test } from 'supertest';
    import express, { Express } from 'express';
    import cors from 'cors';
    import ColecaoController from '../../app/controllers/ColecaoController';
    import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';
    
    // Mock do módulo ColecaoRepository
    jest.mock('../../app/repositories/ColecaoRepository', () => {
      const colecao = {
        id: 1,
        titulo: 'titulo',
        autor: 'autor',
        imagem: 'imagem',
      };
    
      return {
        // Mock das funções do repositório de coleções
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
      // Configuração do servidor de teste
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
      // Encerramento do servidor de teste
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
        // Teste do endpoint GET /colecao com um título muito longo
        const response = await request(app).get('/colecao').query({
          titulo: 'a'.repeat(256)
        });
    
        expect(response.status).toBe(422);
      });
    
      it('deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id', async () => {
        // Teste do endpoint GET /colecao/:id
        const response = await request(app).get('/colecao/1');
    
        expect(response.status).toBe(200);
        expect(typeof response.body === 'object').toBe(true);
        expect(response.body).toEqual(colecao);
      });
    
      it('deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao', async () => {
        // Teste do endpoint POST /colecao para criar uma nova coleção
        const response = await request(app).post('/colecao').send({
          titulo: 'titulo',
        });
    
        expect(response.status).toBe(200);
        expect(typeof response.body === 'object').toBe(true);
        expect(response.body).toEqual(colecao);
      });
    
      it('deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres', async () => {
        // Teste do endpoint POST /colecao com campos muito longos
        const response = await request(app).post('/colecao').send({
          ...colecao,
          titulo: 'a'.repeat(256),
          subtitulo: 'a'.repeat(256),
          autor: 'a'.repeat(256),
          imagem: 'a'.repeat(256)
        });
    
       
    