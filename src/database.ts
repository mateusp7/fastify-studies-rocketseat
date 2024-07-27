import { knex as setupknext } from 'knex'

export const knex = setupknext({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db'
  }
})