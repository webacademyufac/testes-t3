import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

describe('ColecaoService', () => { // contem toda a pilha de teste de colecao service
  let colecaoService: ColecaoService;// cira obj colecao
  let colecaoRepositoryMock: ColecaoRepositoryInterface; // cria o mock para simular colecao repository

  beforeEach(() => {// de iniciar algo, inicia o mocl e a interface
    colecaoRepositoryMock = ColecaoRepositoryMock();
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

  afterEach(() => { // após finalizar algum teste, reseta os mocks
    jest.resetAllMocks();
  });

  describe('findAll', () => {// testes do find all
    it('should return all ColecaoEntity objects', async () => { // deve retornar uma colecao de obj
      const result = await colecaoService.findAll();// realiza a operacao
      expect(result).toEqual(ManyColecaoFixture); // espera que o resultado seja de acordo com o obj estático
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();// espera que o método seja chamado
    });

    it('should call the repository with the specified title', async () => { // deve realizar a funcao com um parametro titulo
      await colecaoService.findAll('titulo');// realizar a operacao
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');// espera que a funcao seja chamada com titulo
    });
  });

  describe('findById', () => { // operacao de busca por id
    it('should return the ColecaoEntity object with the specified ID', async () => {// deve retornar uma colecao de obj com uma id em específico
      const result = await colecaoService.findById(1);// realiza a operacao
      expect(result).toEqual(OneColecaoFixture);// espera que o resultado seja de igual ao obj estático
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);// espera que a funcao seja chamada com 1
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {// deve dar erro ao tentar procurar um obj sem id
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);// jest espiona pra ver como o método vai se comportar

      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);// espera que de erro
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);// espera que a funcao tenha sido chamada
    });
  });

  describe('create', () => {// teste de criacao
    it('should create a new ColecaoEntity object', async () => {// deve criar um novo registro colecao
      const result = await colecaoService.create(ColecaoInterfaceFixture);// cria o registro 
      expect(result).toEqual(CreatedColecaoFixture);// compara para ver se ele está igual ao ibj estático
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined }); /* espera que método
      tenha sido chamado*/
    });
  });

  describe('update', () => {// testes de update
    it('should update the ColecaoEntity object with the specified ID', async () => {// deve atualizar um registro usando uma ID em especifico
      const result = await colecaoService.update(1, ColecaoInterfaceFixture);// deve atualizar um registro e salvar seu resultado em result

      expect(result).toEqual(OneColecaoFixture);// espera que o resultado  seja igual ao obj estático
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);// espera que o método de retorno seja chamado com id 1
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture }); // espera que o update seja feito esses parametros
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {//deve mostrar um erro, se tentar atulizar um obj sem id
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);// jest espionando o comportamento do método
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError);// espera que retorne um erro
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);// espera que a funcao getColecaoOnly seja chamada
    });
  });

  describe('delete', () => {// teste para deletar
    it('should delete the ColecaoEntity object with the specified ID', async () => {// deve deletar a colecao com um objeto esécifico, usando a ID
      await colecaoService.delete(1);// realisa a operacao
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);//espera que o obj apagado seja chamado
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1);// espera que o método delete seja chamado
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {// deve mostrar um erro, caso tente deletar sem ID
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);// jest espiona o comportamento do método
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError);// espera que a operacao seja rejeitada
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);// espera que a funcao getColecaoOnly seja chamada
    });
  });
});
