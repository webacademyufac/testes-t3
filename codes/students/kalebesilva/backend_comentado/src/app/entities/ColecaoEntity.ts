import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import CitacaoEntity from './CitacaoEntity';

@Entity('colecao') // Tabela colecao
class ColecaoEntity { //Ela é composta pelos seguintes atributos
    @PrimaryGeneratedColumn('increment') // Chave primaria, autoincrement
    id: number;// Compo ID (chave primaria)

    @Column({ length: 100, type: 'varchar', nullable: false })/*Titulo, campo com tamanho max de 100, tipo varchar, not null */
    titulo: string;//campo tituto, tipo string

    @Column({ length: 100, type: 'varchar', nullable: true })/*Campo substitulo, tamanha 100 caracteres, tipo varchar, not null*/
    subtitulo?: string; // campo substitulo

    @Column({ type: 'varchar' }) // Coluna varchar, para guardar imagens
    imagem: string; // image, type string

    @Column({ length: 100, type: 'varchar', nullable: false }) // Column with the size 100, your type is varchar and its not accept nullable field
    autor: string; // autor field string type

    @CreateDateColumn({ name: 'created_at' }) // date when you create this camp his save exact moment when its created,
    created_at?: Date;// field name

    @OneToMany(() => CitacaoEntity, (citacao) => citacao.colecao) // relation one to many with colecao
    citacoes?: CitacaoEntity[] // colacao de itens citacoes, relacao com dupla relacao.
}

export default ColecaoEntity; // export this classe for any class get this in your compose.