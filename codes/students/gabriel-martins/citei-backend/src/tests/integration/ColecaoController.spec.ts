import request, { SuperTest, Test } from "supertest";
import express, { Express } from "express";
import cors from "cors";
import ColecaoController from "../../app/controllers/ColecaoController";
import { ColecaoRepositoryInterface } from "../../app/interfaces/repositories/ColecaoRepositoryInterface";
import exp from "constants";

jest.mock("../../app/repositories/ColecaoRepository", () => {
	const colecao = {
		id: 1,
		titulo: "titulo",
		autor: "autor",
		imagem: "imagem",
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

let app: Express; // Instancia do Express
let server: any; // Instancia do servidor
let agent: SuperTest<Test>; // Instancia do SuperTest

beforeAll((done) => {
	// Chama as instancias
	app = express();
	app.use(cors());
	app.use(express.json());
	app.use(ColecaoController.routes);

	// Inicia o servidor na porta 3000
	server = app.listen(3000, () => {
		agent = request.agent(server);
		done();
	});
});

// Fecha o servidor e o banco de dados
afterAll((done) => {
	server.close(done);
});

// Testes
describe("ColecaoController", () => {
	const colecao = {
		id: 1,
		titulo: "titulo",
		autor: "autor",
		imagem: "imagem",
  };
  
	it("deve retornar 422 ao enviar um título com mais de 255 caracteres", async () => {
		const response = await request(app)
			.get("/colecao").query({titulo: "a".repeat(256)}); // Envia um titulo com mais de 255 caracteres
		expect(response.status).toBe(422); // Espera um status 422
	});

	it("deve retornar um código de status 200 OK e um objeto colecao para GET /colecao/:id", async () => {
		const response = await request(app).get("/colecao/1"); // Envia um id válido

		expect(response.status).toBe(200); // Espera um status 200
		expect(typeof response.body === "object").toBe(true);  // Espera um objeto
		expect(response.body).toEqual(colecao); // Espera um objeto igual ao mock
	});

	it("deve retornar um código de status 422 e um objeto colecao para GET /colecao/:id", async () => {
		const response = await request(app).get("/colecao/1"); 

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
		expect(response.body).toEqual(colecao);
	});

	it("deve retornar um código de status 200 OK e um novo objeto colecao para POST /colecao", async () => {
		const response = await request(app).post("/colecao").send({
			titulo: "titulo",
		}); // Envia um objeto válido

		expect(response.status).toBe(200); // Espera um status 200
		expect(typeof response.body === "object").toBe(true); // Espera um objeto
		expect(response.body).toEqual(colecao); // Espera um objeto igual ao mock
	});

	it("deve retornar um código de status 422 ao enviar campos com mais de 255 caracteres", async () => {
		const response = await request(app)
			.post("/colecao")
			.send({
				...colecao,
				titulo: "a".repeat(256),
				subtitulo: "a".repeat(256),
				autor: "a".repeat(256),
				imagem: "a".repeat(256),
			}); // Envia um objeto com campos com mais de 255 caracteres

		expect(response.status).toBe(422); // Espera um status 422
	});

	it("deve retornar um código de status 422 ao deixar de enviar o titulo", async () => {
		const response = await request(app)
			.post("/colecao")
			.send({ ...colecao, titulo: undefined }); // Envia um objeto sem o titulo

		expect(response.status).toBe(422); // Espera um status 422
	});

	it("deve retornar um código de status 422 ao deixar de enviar o titulo", async () => {
		const response = await request(app)
			.post("/colecao")
			.send({ ...colecao, autor: undefined }); // Envia um objeto sem o autor

		expect(response.status).toBe(422); // Espera um status 422
		expect(response.body).toMatchSnapshot(); // Espera um objeto igual ao mock
	});

	it("deve retornar um código de status 422 ao deixar de enviar dados obrigatorios", async () => {
		const response = await request(app)
			.post("/colecao")
			.send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined }); // Envia um objeto sem os dados obrigatorios

		expect(response.status).toBe(422); // Espera um status 422
		expect(response.body).toMatchSnapshot(); // Espera um objeto igual ao mock
	});

	it("deve retornar um código de status 200 OK e um objeto colecao atualizado para PUT /colecao/:id", async () => {
		const response = await request(app).put("/colecao/1").send(colecao); // Envia um objeto válido para atualizar

		expect(response.status).toBe(200); // Espera um status 200
		expect(typeof response.body === "object").toBe(false); // Espera um objeto
		expect(response.body).toEqual(colecao); // Espera um objeto igual ao mock
	});

	it("deve retornar um código de status 200 OK e uma mensagem de sucesso para DELETE /colecao/:id", async () => {
		const response = await request(app).delete("/colecao/1"); // Envia um id válido para deletar

		expect(response.status).toBe(200); // Espera um status 200
		expect(response.body).toEqual({ message: "Colecao removida com sucesso!" }); // Espera uma mensagem de sucesso
	});
});
