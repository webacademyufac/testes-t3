/*Interface de colecao, ela funciona como se fosse o Model em que os objetos Colecao devem seguir
, nesse caso, um obj colecao deve ter esses seguinte atributos */
interface ColecaoInterface {
    id?: number;
    titulo: string;
    subtitulo?: string;
    imagem: string;
    autor: string;
}

export default ColecaoInterface; //Exportando a interface par ser usada em outras partes da aplicacao.