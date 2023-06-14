import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCitacaoTable1685674751168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "citacao",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "titulo",
                    type: "varchar",
                    length: "1000",
                    isNullable: false
                },
                {
                    name: "id_colecao",
                    type: "integer",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                }
            ],
            foreignKeys: [
                {
                    name: "FK_COLECAO",
                    referencedTableName: "colecao",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_colecao"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("citacao")
    }

}
