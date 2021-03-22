import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('last_access').defaultTo(null);
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropSchema('users');
}

