import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import ColecaoEntity from './ColecaoEntity';

@Entity('citacao')
class CitacaoEntity {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({ length: 1000, type: 'varchar', nullable: false })
    titulo: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at?: Date;

    @Column({ name: 'id_colecao', type: 'int', nullable: false })
    id_colecao: number;

    @OneToMany(() => ColecaoEntity, (colecao) => colecao.citacoes)
    colecao?: ColecaoEntity;
}

export default CitacaoEntity;