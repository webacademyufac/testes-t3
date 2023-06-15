import { Request, Response, Router } from 'express';
import ColecaoService from '../services/ColecaoService';
import ColecaoInterface from '../interfaces/entities/ColecaoInterface';
import {
  CreateColecaoValidator,
  GetColecaoValidator,
  UpdateColecaoValidator,
} from '../validators/ColecaoValidator';
import errorHandler from '../Errors/ErrorHandle';
import ColecaoServiceInterface from '../interfaces/services/ColecaoServiceInterface';
import ColecaoRepository from '../repositories/ColecaoRepository';
import { validationResult } from 'express-validator';

class ColecaoController { /*Essa classe tem o objetivo de solicitar ao service as operacoes ao banco de dados
utilizando as rotas, de maneira simplificada, essa classe serve para controllar as requisicoes pelas rotas
, assim como validalas para que não seja enviado ao que não estamos esperando receber em nosso banco de dados.*/

  public routes = Router();/* Para iniciarmos, precisaremos primeiro criar  um objeto routes e logo em seguida instancialo
  , ele será publico, pois necessita ser acessado fora do classe ColecaoController e em seguida iremos criar um objeto 
  privado, chamado colecao service, esse objeto sera usado para que possamos solicitar as operacoes padroes (read,create
  ,update and delete) ao banco de dados*/
  private colecaoService: ColecaoServiceInterface;

  /*Após criamos os nossos dois objetos principais para o funcionamento da classe como um todo, iremos 
  criar o seu construtor, o construtor serve para construir a classe de fato, quando essa classe for instanciada, ela será criada
  da forma que colocarmos a baixo. Além disso o construtor irá servir para que o framework possa fazer a injecao de dependencias
  quando ele achar que for necessário. */
  constructor() { 
    /*Após criamos a o construtor, precisamos informar o que sera necessário construir para que nossa classe seja criada corretamente
    para isso, primeiramente, iremos instanciar nossa variável privada chamada colecaoService, essa variável será a responsável
    por solicitar ao nosso banco de dados todas as nossas operacoes CRUD, mas para que ela funcione, precisamos lhe informar
    em que repositorio ela irá atuar, para isso, nós impotamos o repositorioCitacao, que é onde contem os métodos crud o
    service ira utilizar.*/
    this.colecaoService = new ColecaoService(ColecaoRepository); 

    /*Após instanciarmos nosso service, iremos precisar criar as rotas da nossa aplicacao, para isso iremos utilizar
    o obj router, criado anteiormente, cada operacao no nosso escopo irá possui um dos seguintes métodos: get,post,put
    and delete. O método get serve para que possamos pedir algo, mas sem mandar nenhum objeto no corpo da requisicao(read),
    o método post serve para que possamos mandar algo no corpo da requisicao, normalmente com o objetivo de criarmos algo(create),
    o métood put funciona de forma parecisa com o post, porém sua finalidade é atualizar algo(update) e por fim
    o método delete, ele é utilizado para deletar algo(delete)*/

    /*Nossos duas primeiras rotas serão utilizadas com get, a primeira servirar para solicitarmos ao service que ele nos
    entregue uma lista com todos os objetos colecao e a proxima rota servirá para que o service nos entregue apenas o objeto
    cuja a id está igual a que informaremos na url*/
    this.routes.get('/colecao', GetColecaoValidator, this.findAll.bind(this));
    this.routes.get('/colecao/:id', this.findById.bind(this));

    /*A proxima rota será utilizada para que possamos criar que informemos que queremos criar um novo registro no banco de dados,
    segundo os parametros que iremos enviar no corpo da requisicao */
    this.routes.post( 
      '/colecao',
      CreateColecaoValidator,
      this.create.bind(this)
    );

    /*Agora iremos fazer uma rota para solicitar a atualizacao de algum registro no banco de dados, para isso utilizaremos 
    o método put, dentro dele, passaremos a rota e o id, que utilizaremos para atualizar um registro em específico*/
    this.routes.put(
      '/colecao/:id',
      UpdateColecaoValidator,
      this.update.bind(this)
    );
    /*Agora, iremos criar a rota para deletarmos um registro, nela, passaremos o id e por fim chamaremos a funcao delete
    que, assim como as outras, iremos criar logo a seguir, essa funcao irá utilizar os parametros de rota que diremos("
    /colecao/:id") */
    this.routes.delete('/colecao/:id', this.delete.bind(this));
  }

  /*Agora é a hora de implementarmos as funcoes(métodos) que iremos utilizar nas nossas rotas, a primeira é a findAll,
  essa funcao irá retornar um JSON, contendo no seu corpo, uma lista de registros. */
  async findAll(request: Request, response: Response): Promise<Response> {
    /*Essa funcao funciona dentro de um laço try catch, esse laço funciona da seguinte forma, caso algo de errado enquanto
    ele tenta realizar as operacoes, ele irá pular para o catch, mas sua vantagem é que ele não irá quebrar nossa aplicacao,
    por ter dado erro.  */
    try {

      /*Primeira coisa que iremos fazer é verificar se nossa requisicao está de acordo com o que esperamos que esteja
      e iremos salvar isso dentro de uma variável, caso ele encontre algo fora do nosso padrão esperado, a variável sera algo
      diferente de vazio */
      const result = validationResult(request);

      /*Agora, precisamos verificar se nosso result tem algo diferente de vazio, se sim, então ele irá retornar um erro, 
      dessa forma, estamos protegendo nosso banco de dados de receber algum dado não esperado. */
      if (!result.isEmpty()) {
        return response.status(422).json({ errors: result.array() });
      }

      /*Caso esteja tudo OK, iremos criar uma constante que ira guardar o retorno de nosse requisicao, no caso a lista de
      registros que nosso service ira nos retornar*/
      const colecoes = await this.colecaoService.findAll(request.query.titulo as string);

      /*Após recebermos essa lista, iremos retornar ela, porém temos que retornar esses dados em um padrão, o padrão que
      iremos retornar será em JSON */
      return response.json(colecoes);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  /*Essa irá funcionar de forma parecida com a anterior, mas a diferenca é que, enquanto a outra retornava uma colecao de
  registros, essa retornará um em especifico, no caso, o registro que buscamos pela ID */
  async findById(request: Request, response: Response): Promise<Response> {
    
    try {
      /*Como essa funcao busca algo em especifico, que atenda a certo parametro, precisamos capiturar essa parametro, para isso
      utilizaremos o resqust.params e salvaremos ele em uma constante. */
      const { id } = request.params;
      /*Agora que temos o que é necessário para chamar o nosso método findById utilizando o service, iremos chamalo, esperar
      a resposta e por fim, salvar ele em uma variável constante. */
      const colecao = await this.colecaoService.findById(Number(id));

      /*Por fim, iremos retornar o resultado de nossa operacao, porém, antes precisaremos nossa respota para um padrão,
      o padrão que iremos utilizar é o padrão JSON */
      return response.json(colecao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  /*Agora iremos criar as funcoes responsáveis por modificar algo em nosso database, primeiro, iremos fazer a funcao 
  create, responsável por criar um novo registro no banco de dados, assim como as outras iremos utilizar um laço try 
  catch, e iremos validar, então, por conta disso, não irei comentar o que está acontecendo nessas partes do código, pois
  já comentei anteiormente.*/
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(422).json({ errors: result.array() });
      }
      /*Agora precisamos configurar o corpo de nossa requisicao e salvaremos ele em uma variável constante */
      const colecao = request.body as ColecaoInterface;

      /*Agora iremos solicitar a operacao de fato e salvaremos o seu retorno em uma variável constante, para fazer isso
      utilizaremos nossa variável, criada no inicio da classe, chamada colecaoService, ela é a responsável por solicitar 
      a operacao create ao nosso repository e o repository ai banco de dados. */
      const newColecao = await this.colecaoService.create(colecao);

      /*Por fim, iremos retornar a nossa resposta, mas não podemos retornar de qualquer forma, então converteremos ela
      para json*/
      return response.json(newColecao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  /*Agora precisamos criar a funcao update, responsável por atualizar um registro em especifico no banco de dados,
  ela irá primeiramente validar a nossa requisicao e em seguida, ira capturar nossa ID, da mesma maneira que a funcao
  findById*/
  async update(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(422).json({ errors: result.array() });
      }
      const { id } = request.params;
      const colecao = request.body as ColecaoInterface;

      /*Aqui ela solicitara ao nosso service que nós entregue o update do nosso registro solicitado e para isso, utilizaremos
        os parametros ID(convertendo de string pra number) e nossa colecao(o corpo de nossa requisicao) */
      const updatedColecao = await this.colecaoService.update(
        Number(id),
        colecao
      );
      //Por fim retornaremos nossa resposta convertendo ela pra JSON.
      return response.json(updatedColecao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  /*Por fim, para finalizar, iremos criar a funcao que será responsável por apagar um registro em específico, algo interessante
  a se notar é que aqui não fazemos verificacao, ou seja, nossa requisicao nao possui um corpo para verificar, por conta disso
  bastar apenas que capturemos a ID e em seguida solicitarmos ao banco de dados que delete o registro em questao. */
  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      /*Para apagar um registro precisamos chamar nosso service, com o método delete e passarmos nossa id
        mas antes, necessitamos convertela para number*/
      await this.colecaoService.delete(Number(id));

      /*E por fim, como resposta retornaremos uma mensagem de sucesso ao usuário */
      return response.json({ message: 'Colecao removida com sucesso!' });
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }
}

/*Então para finalizar, exportamos a classe para que possa ser usada em outros lugares da aplicacao
 */
export default new ColecaoController(); 