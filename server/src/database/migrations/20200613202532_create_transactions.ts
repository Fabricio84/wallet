import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();

    table
      .integer('transaction_type_id')
      .notNullable()
      .references('id')
      .inTable('transaction_type');

    table.date('date').notNullable();

    table.string('description');

    table.integer('installment');
    table.integer('installment_total').notNullable();

    table.decimal('amount').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('transactions');
}
