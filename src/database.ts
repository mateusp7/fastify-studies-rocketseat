import "dotenv/config";
import { Knex, knex as setupKnex } from "knex";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL env not found. Please set if in .env file");
}

export const knexConfig: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = setupKnex(knexConfig);
