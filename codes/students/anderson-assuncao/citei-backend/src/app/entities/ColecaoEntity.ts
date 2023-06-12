import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import CitacaoEntity from './CitacaoEntity';

@Entity('colecao')
class ColecaoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 100, type: 'varchar', nullable: false })
    titulo: string;

    @Column({ length: 100, type: 'varchar', nullable: true })
    subtitulo?: string;

    @Column({ type: 'varchar' })
    imagem: string;

    @Column({ length: 100, type: 'varchar', nullable: false })
    autor: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at?: Date;

    @OneToMany(() => CitacaoEntity, (citacao) => citacao.colecao)
    citacoes?: CitacaoEntity[]
}

export default ColecaoEntity;