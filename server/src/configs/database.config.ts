import { User } from "src/core/users/users.model";

export const databaseConfig = {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    models: [User],
    autoLoadModels: true
  }