/*Interface dos objetos, se fosse em java, poderiamos entender como se fosse uma classe Model */
interface CitacaoInterface { 
  id?: number;
  titulo: string;
  id_colecao: number;
  created_at?: Date;
}

export default CitacaoInterface; // Exportando a interface que que possa ser usada em outras partes da aplicacao.