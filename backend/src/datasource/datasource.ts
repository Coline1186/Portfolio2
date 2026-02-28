import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: "./db.env" });

const isProd = process.env.NODE_ENV === "production";

export default new DataSource({
  type: "postgres",
  url: isProd ? process.env.DATABASE_URL : undefined,
  host: isProd ? undefined : "db",
  port: 5432,
  username: isProd ? undefined : process.env.POSTGRES_USER,
  password: isProd ? undefined : process.env.POSTGRES_PASSWORD,
  database: isProd ? undefined : process.env.POSTGRES_DB,
  ssl: isProd ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: false,
  entities: [isProd ? "build/entities/**/*.js" : "src/entities/**/*.ts"],
  migrations: [isProd ? "build/migrations/**/*.js" : "src/migrations/**/*.ts"],
});
