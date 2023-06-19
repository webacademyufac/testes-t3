import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateColecaoTable1685670316914 } from './migrations/1685670316914-CreateColecaoTable'
import { CreateCitacaoTable1685674751168 } from './migrations/1685674751168-CreateCitacaoTable'
import ColecaoEntity from "../app/entities/ColecaoEntity"
import CitacaoEntity from "../app/entities/CitacaoEntity"

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [ColecaoEntity, CitacaoEntity],
    migrations: [CreateColecaoTable1685670316914, CreateCitacaoTable1685674751168],
    subscribers: [],
})
