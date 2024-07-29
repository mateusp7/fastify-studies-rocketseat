import request from "supertest";
import { afterAll, beforeAll, test } from "vitest";
import { app } from "../src/app";

{
  /*
    This is usefull to await the app to be ready before running the tests, 
    because the tests wouldn't be able to make requests to the server before it's ready.
  */
}
beforeAll(async () => {
  await app.ready();
});

{
  /*
  This is usefull to close the app after running the tests,
  */
}
afterAll(async () => {
  await app.close();
});

test("User can create a new transaction", async () => {
  await request(app.server)
    .post("/transactions")
    .send({
      title: "New Transaction",
      amount: 5000,
      type: "credit",
    })
    .expect(201);
});
