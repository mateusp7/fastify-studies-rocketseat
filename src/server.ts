import fastify from "fastify";
import { knex } from "./database";
import crypto from 'node:crypto'
import { env } from "./env";

const app = fastify();

app.get('/transactions', async (req, res) => {
  const tables = await knex('transactions').select('*')
  return tables
});

app.post("/transactions", async (req, res) => {
  const transaction = await knex("transactions").insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000,
  }).returning("*")
  return transaction;
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server listening on port ${env.PORT} 🚀`);
  });
