import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
});
