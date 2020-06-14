import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();

    table
      .integer('transaction_type_id')
      .notNullable()
      .references('id')
      .inTable('transaction_type');

    table.string('description').notNullable();

    table.integer('installment');
    table.integer('installment_total').notNullable();

    table.decimal('amount').notNullable();
    table.decimal('balance').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('transactions');
}
