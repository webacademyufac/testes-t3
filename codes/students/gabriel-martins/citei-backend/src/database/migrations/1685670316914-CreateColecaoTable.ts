import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateColecaoTable1685670316914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "colecao",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "titulo",
                    type: "varchar",
                    isPrimary: true,
                    length: "100",
                    isNullable: false,
                },
                {
                    name: "subtitulo",
                    type: "varchar",
                    length: "100",
                    isNullable: true,
                },
                {
                    name: "imagem",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "autor",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("colecao")
    }

}
