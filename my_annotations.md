## My Annotations

### Migrates commands

1. ```npx knex migrate:make ${migration_name}``` - Create a new migration file
2. ```npx knex migrate:latest``` - Run all migrations
3. ```npx knex migrate:rollback``` - Rollback last migration in case of up incorrect field or something like that

### Migrate commands with TS_NODE_COMPILER_OPTIONS

1. ```TS_NODE_COMPILER_OPTIONS='{ "module": "commonjs" }' npx knex migrate:make ${migration_name}``` - Create a new migration file
2. ```TS_NODE_COMPILER_OPTIONS='{ "module": "commonjs" }' npx knex migrate:latest``` - Run all migrations
3. ```TS_NODE_COMPILER_OPTIONS='{ "module": "commonjs" }' npx knex migrate:rollback``` - Rollback last migration in case of up incorrect field or something like that
