import "reflect-metadata"
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: "./db.env" });

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false, // pas à utiliser en prod (faire des migrations pour la prod);
  logging: false, // nous permettra de voir les requêtes SQL qui sont jouées dans le terminal

  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
});
