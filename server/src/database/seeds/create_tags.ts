import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tags').insert([
        { name: 'Transporte' },
        { name: 'Combustivel' },
        { name: 'Manutenção' },
        { name: 'Documentação' },
        { name: 'Seguro' },
        { name: 'Carro' },
        { name: 'Moto' },
        { name: 'Saúde' },
        { name: 'Educação' },
        { name: 'Lanche' },
        { name: 'Igreja' },
        { name: 'Presente' },
        { name: 'Mercado' },
        { name: 'Alimentação' },
        { name: 'Feira' },
        { name: 'Imóvel' },
        { name: 'Cartão Taxa' },
        { name: 'Banco' },
        { name: 'Dinheiro' },
        { name: 'Debito' },
        { name: 'Credito' },
      ]);
    });
}
