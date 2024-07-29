import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {

    const createTransactionBodySchema = z.object({
      title: z.string().min(1),
      amount: z.number().min(1),
      type: z.enum(["credit", "debit"]),
    })

    const body = createTransactionBodySchema.parse(request.body);

    const { title, amount, type } = body;
    await knex("transactions")
      .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === "credit" ? amount : amount * -1,
      })
      
    return reply.status(201).send('Transação criada com sucesso!')
  });
  app.get("/", async () => {
    const tables = await knex("transactions").select("*");
    return tables;
  });

}
