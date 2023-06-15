import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import ColecaoEntity from './ColecaoEntity';

@Entity('citacao') /*Essa classe irá servir para criacao da tabela no banco de dados
a tela estará com o mesmos atributos listado a baixo, a forma que é escrita
lembra bastante o hibernate com java */
class CitacaoEntity {
    @PrimaryGeneratedColumn('increment')// Primary key, autoIncrement
    id?: number;//Atributo ID, do tipo number

    @Column({ length: 1000, type: 'varchar', nullable: false }) /*
    Coluna com tamanho máximo de 1000 caracteres, tipo varchar, not null */
    titulo: string;// Campo titulo, tipo de dado: string

    @CreateDateColumn({ name: 'created_at' }) //Coluna de data, salvando a data assim que um
    // novo registro é criado
    created_at?: Date; // campo data, informando quando foi criado  o registro

    @Column({ name: 'id_colecao', type: 'int', nullable: false }) /**
    Coluna foreign key, referendo a id_colecao, tipo inteiro not null */
    id_colecao: number; // campo id_colecao, tipo do dado: numero

    @OneToMany(() => ColecaoEntity, (colecao) => colecao.citacoes) /* Relacionamento um para muitos, referentes
    as tabelas colecao, conectaca a citacao.
    
    */
    colecao?: ColecaoEntity; // compo para relacao.
}

export default CitacaoEntity; // exportando a classe para ser usada por outras classes