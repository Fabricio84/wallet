import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('transaction_types')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('transaction_types').insert([
        { name: 'Receita' },
        { name: 'Despesa' },
      ]);
    });
}
