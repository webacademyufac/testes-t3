describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock();
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

  // limpeza após cada teste
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all ColecaoEntity objects', async () => {
      // executa o método findAll do serviço de coleção
      const result = await colecaoService.findAll();

      // verifica se o resultado é igual ao conjunto de coleções esperado
      expect(result).toEqual(ManyColecaoFixture);
      // verifica se o método findAll do mock do repositório foi chamado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should call the repository with the specified title', async () => {
      // executa o método findAll do serviço de coleção com um título especificado
      await colecaoService.findAll('titulo');

      // verifica se o método findAll do mock do repositório foi chamado com o título especificado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');
    });
  });

  describe('findById', () => {
    it('should return the ColecaoEntity object with the specified ID', async () => {
      // executa o método findById do serviço de coleção com um ID especificado
      const result = await colecaoService.findById(1);

      // verifica se o resultado é igual à coleção esperada com o ID especificado
      expect(result).toEqual(OneColecaoFixture);
      // verifica se o método findById do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // configura o mock do método findById para retornar null
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);

      // verifica se a chamada ao método findById do serviço de coleção com um ID inexistente resulta em um erro do tipo AppError
      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);
      // verifica se o método findById do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new ColecaoEntity object', async () => {
      // executa o método create do serviço de coleção com uma nova coleção
      const result = await colecaoService.create(ColecaoInterfaceFixture);

      // verifica se o resultado é igual à coleção criada esperada
      expect(result).toEqual(CreatedColecaoFixture);
      // verifica se o método create do mock do repositório foi chamado com os dados corretos da nova coleção
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined });
    });
  });

  describe('update', () => {
    it('should update the ColecaoEntity object with the specified ID', async () => {
      // executa o método update do serviço de coleção com um ID e dados de atualização especificados
      const result = await colecaoService.update(1, ColecaoInterfaceFixture);

      // verifica se o resultado é igual à coleção atualizada esperada
      expect(result).toEqual(OneColecaoFixture);
      // verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      // verifica se o método update do mock do repositório foi chamado com o ID e os dados de atualização corretos
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture });
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // configura o mock do método getColecaoOnly para retornar null
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      // verifica se a chamada ao método update do serviço de coleção com um ID inexistente resulta em um erro do tipo AppError
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError);
      // verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('should delete the ColecaoEntity object with the specified ID', async () => {
      // executa o método delete do serviço de coleção com um ID especificado
      await colecaoService.delete(1);

      // verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
      // verifica se o método delete do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // configura o mock do método getColecaoOnly para retornar null
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      // verifica se a chamada ao método delete do serviço de coleção com um ID inexistente resulta em um erro do tipo AppError
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError);
      // verifica se o método getColecaoOnly do mock do repositório foi chamado com o ID especificado
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
