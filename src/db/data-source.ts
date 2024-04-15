import path from "path";
import { DataSource } from "typeorm";
import { Pays } from "../entities/Pays";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "..", "database.db"),
  synchronize: true,
  logging: false,
  entities: [Pays],
  migrations: [path.join(__dirname, "migrations", "*.ts")],
});
