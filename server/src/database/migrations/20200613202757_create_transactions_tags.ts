import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('transactions_tags', (table) => {
    table.increments('id').primary();

    table
      .integer('transaction_id')
      .notNullable()
      .references('id')
      .inTable('transactions');

    table.integer('tag_id').notNullable().references('id').inTable('tags');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('transactions_tags');
}
