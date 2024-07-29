import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions").select();
    return { transactions };
  });

  app.get("/:id", async (request) => {
    const getTransactionByIdSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionByIdSchema.parse(request.params);

    const transaction = await knex("transactions").where("id", id).first();

    return { transaction };
  });

  app.get("/summary", async () => {
    const summary = await knex("transactions")
      .sum("amount", { as: "amount" })
      .first();

    return { summary };
  });

  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string().min(1),
      amount: z.number().min(1),
      type: z.enum(["credit", "debit"]),
    });

    const body = createTransactionBodySchema.parse(request.body);

    const { title, amount, type } = body;
    await knex("transactions").insert({
      id: crypto.randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send("Transação criada com sucesso!");
  });
}
