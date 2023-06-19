import { Request, Response, Router } from 'express';
import CitacaoService from '../services/CitacaoService';
import CitacaoInterface from '../interfaces/entities/CitacaoInterface';
import { validationResult } from 'express-validator';
import {
  CreateCitacaoValidator,
  GetCitacaoValidator,
  UpdateCitacaoValidator,
} from '../validators/CitacaoValidator';
import CitacaoRepository from '../repositories/CitacaoRepository';
import ColecaoRepository from '../repositories/ColecaoRepository';
import errorHandler from '../Errors/ErrorHandle';
import CitacaoServiceInterface from '../interfaces/services/CitacaoServiceInterface';

class CitacaoController {
  public routes = Router(); /*Cria um obj para usar as rotas */
  private citacaoService: CitacaoServiceInterface; /* Cria um objeto referente a camada de servico, a camada de controller
  não tem acesso a camada service diretamente, ela serve apenas pra "pedir" algo e o service irá suprir, um exemplo
  no mundo real, poderia ser de um garçon(service) e um cliente(controller), o cliente pede o que necessita e o garçon trás, o cliente
  não sabe como o garçon vai trazer e nem o garçon sabe o que o cliente quer com fazer com o pedido.
*/

  /* Cria um construtor para que possa ser realizada a injeção de dependendencia por parte do framework*/
  constructor() { /*Basicamente é aqui onde estamos tirando a nossa responsabilidade por iniciar as classes e a gerencia delas
  para entregasmos ao framework, por um lado isso é bom, porque temos menos trabalho, por outro não */

    this.citacaoService = new CitacaoService( /* É aqui onde iniciamos o objeto citacaoService criando anteriormente*/
      CitacaoRepository, /*O construtor de citacaoService possue dois parametros,  o primeiro é referente
       ao repositorio das citacoes, a o outro é o repositorio de coleções, o repositorio tem a função de interagir com o 
       banco de dados e entregar os dados solicitados ao service, se fossemos pensar na ilustração anteior, o garçon 
       pede o pedido ao cozinheiro(repository), ele entrega o pedido para o garçon, que posteiormente entrega para o cliente(controller)
       e etc.*/
      ColecaoRepository 
    );
  
    this.routes.get('/citacao', GetCitacaoValidator, this.findAll.bind(this)); /*Agora nos iremos solicitar ao os dados referente
    a uma determinada rota, aqui no queremos todos os objetos citações, usamos para isso o método findAll */
    this.routes.get('/citacao/:id', this.findById.bind(this)); /*Aqui é a mesma lógica, mas solicitamos um objeto em específico
    usando a ID dele como base para a pesquisa no banco de dados*/
    this.routes.post(/*Aqui iremos solicitar algo ao banco de dados de novo, porém, ao contrário dos outros métodos
    que usamos o GET, aqui usamos o POST, ou seja, nos queremos algo, mas precisamos atender a determinados requisitos, ou seja,
    nesse caso ele quer criar uma nova citação, então ele irá enviar os dados para serem inseridos no banco de dados,
    podemos chamar isso de corpo da requisição. Queremos criar algo, normalmente esse método retorna alguma mensagem, de erro
    ou sucesso */ 
      '/citacao',
      CreateCitacaoValidator,
      this.create.bind(this)
    );
    this.routes.put( /*Aqui a lógica é parecida com a do post, porém a diferença é que o fim é diferente, na anterior nós
    buscamos criar um NOVO objeto (não um objeto, ta mais pra registro no BD, mas a fim de entendimento, vou falar objeto),
    Mas sim atualizar um objeto já existente no banco de dados, para isso nós informaremos a ID e esse método também pode retornar
    uma mensagem de sucesso ou erro. */
      '/citacao/:id',
      UpdateCitacaoValidator,
      this.update.bind(this)
    );
    this.routes.delete('/citacao/:id', this.delete.bind(this));/*Esse aqui lembra um pouco o formato de get, pois nós não mandar
    algo no corpo da requisição, mas ao contrário do get que apenas retorna, esse aqui apaga um registro no banco de dados e retorna
    uma mensagem de erro ou sucesso, para que possamos utilizar o delete, precisamos informar qual será o ID que iremos apagar
    do banco de dados.*/
  }

  async findAll(request: Request, response: Response): Promise<Response> {/*É aqui onde realizaremos as operações de fato
  na parte das rotas, apenas chamamos essa e as outras funções, agora nós iremos cria-las de fato */
    try {/*Primeiro, vamos colocar tudo em um try catch, esse tipo de laço funciona da seguinte forma, ele ira TENTAR, realizar 
    a solicitação para o service de citação, caso ele não consiga, ele irá pular para o catch e informar que ouve algum
    erro */
      const citacoes = await this.citacaoService.findAll(request.query.titulo as string); /*
      Aqui iremos criar uma variável constante, variáveis constantes não podem ter seu conteúdo alterado após serem criadas,
      nela iremos colocar o resultado da nossa requisição ao service, podemos notar um AWAIT alí, antes do this.citacaoService,
      ele como o nome sugere tem o objetivo de esperar que a resposta seja entrega, enquanto a resposta não for entregue, ele fica ai
      esperando, caso a gente não coloque o AWAIT, o codigo irá executar, mas não irá dar tempo dos dados chegarem na variável
      antes código ser lido, resultando em um erro de semântica.  */
      return response.json(citacoes); /*Após recebemos a nossa pesquisa do banco de dados, iremos trasforma-la em json
      esse json é o que o front-end irá receber quando solicitar algo ao back-end. */
    } catch (error) {
      errorHandler(error, request, response, null); //Mostra o erro, caso ele ocorra.
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {/*Essa função é parecida com a anterior, pois as duas
  são do tipo GET, a diferença é que enquanto a anterior irá retornar todos os registros do banco de dados, referente ao que será 
  solicitado, esse irá retornar apenas um registro */
    try {// Laço try catch, mesma lógica explicada anteriormente
      const { id } = request.params; /*Aqui nós iremos criar uma constante id, que irá receber um paremetro na requisição,
      basicamente ela irá capiturar a ID na URl de requisição e armazenala nessa constante. */
      const citacao = await this.citacaoService.findById(Number(id)); /*Aqui nós iremos solicitar ao nosso service que ele 
      nos entregue a resposta do banco de dados, no caso, registro que queremos e usamos o AWAIT para aguardar ele "retornar" com
      nosso pedido */
      return response.json(citacao); /*Aqui nós iremos retornar a a resposta, ela será convertida para JSON e ele
      será entregue quando o front-end fizer a requisição. */
    } catch (error) {
      errorHandler(error, request, response, null); // Caso nossa requisição dê algum erro, ele irá informar no console
      // qual foi o erro.
    }
  }

  async create(request: Request, response: Response): Promise<Response> {/*Algo que não comentei anteiormente é sobre 
  esse async nessas funções, o async é algo do javascript, ele informa que a função a seguir é uma função assincrona,
  uma função dessa permete que usemos nomeclaturas assincronas, como AWAIT por exemplo. Essa função é responsável por solicitar
  ao service que crie um novo registro no banco de dados */ 
    try { 
      const result = validationResult(request); /*Essa é um tipo de requisição que necessita de tratamento de dados
      pois tais dados podem danificar nosso banco de dados, então por conta disso, precisamos validar ela.*/
      if (!result.isEmpty()) { /*Após pedimos para o método validationResult validar a requisicao, iremos ver se ele retornou
      algo diferente de vazio, se sim, então a requisicao nao está do jeito que nossa aplicacao espera, então retornarmos
      um erro 400. */
        return response.status(400).json({ errors: result.array() });
      }
      const citacao = request.body as CitacaoInterface; /*Caso esteja tudo bem com nossa requisicao, nos iremos criar um
      corpo par a citacao */
      const newCitacao = await this.citacaoService.create(citacao); /*Agora que temos um corpo criado, iremos solicitar
      ao service que solicite que seja criado um novo registro no banco de dados, usando como parametro a nossa citacao
      e por fim, iremos atribuir isso a uma nova constante que por fim retornaremos ao front-end usando o padrão json */
      return response.json(newCitacao);
    } catch (error) { // Caso ocorra algum erro e o try não dê certo, iremos informar que ouve um erro com o catch
      errorHandler(error, request, response, null);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {/*Esse método é referente ao update de uma tabela
  já existente, ele se assemelha bastante com o create, mas sua proposta é diferente, enquanto o create busca criar um
  novo registro, ele atualizara um registro já existente */
    try {
      const result = validationResult(request);/*Primeiramente precisamos verificar se a solicitacao está de acordo com o
      que esperamos receber e caso ela não esteja, a variável result receberar algo diferente de vazio, dessa forma entrando
      nas condicoes da nossa verificacao, resultando no retorno de error 400 + detalhes sobre o que aconteceu. */
      if (!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
      }
      const { id } = request.params; /*Para nós sabermos qual campo devemos atualizar, precisaremos saber o id do registro,
      nesse caso, do registro em que queremos alterar, para isso iremos capturar o id da requisicao. */
      const citacao = request.body as CitacaoInterface; // Assim como no método anterior, iremos preparar o o corpo da 
      //requisicao e salvar em uma constante. Essa constante irá servir como parametro da nossa solicitacao de update ao
      //service.
      const updatedCitacao = await this.citacaoService.update(
        Number(id),
        citacao
      ); /*Agora é onde iremos realizar a solicitacao de fato, aqui iremos usar a ID capturada, assim como os dados que
      buscamos modificar, após recebermos a resposta do service, iremos guarda-la em uma constante chamada updateCitacao
      e por fim, retornaremos a  resposta no padrao json. */ 
      return response.json(updatedCitacao);
    } catch (error) { // Caso o try não consiga executar por algum motivo, ele mostar um erro.
      errorHandler(error, request, response, null);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> { /*O método delete, como o proprio nome sugere
  iremos apagar algum registro do banco de dados, nesse caso, solicitar ao service que esse registro seja apagado,
  para isso iremos precisar capturar a id que está represente na requisicao, pois não queremos apagar todos os registros
  do banco de dados e sim apenas o registro que solicitamos. */
    try {
      const { id } = request.params;
      await this.citacaoService.delete(Number(id)); /** Ao contrario das outras solicitacoes, essa não irá retornar nenhum
      body, por isso nós não precisamos guarda-la em uma constante, como tinhamos feito anteiormente, mas precisamo dizer
      ao frontend ou usuário (depende), se o registro em questão foi removido ou não, então iremos retornar uma mensagem
      informando que o registro foi removido com sucesso */
      return response.json({ message: 'Citacao removida com sucesso!' });
    } catch (error) { 
      errorHandler(error, request, response, null);
    }
  }
}

export default new CitacaoController(); /* Por fim, iremos exportar essa classe para que ela possa ser acessada em outras
partes da nossa aplicacao. */ 
