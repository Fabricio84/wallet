const request = require('supertest');
import app from '../src/app';
import knex from '../src/database/connection';

describe('Test server', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test transactions routes', () => {
  beforeAll(() => {
    return knex.migrate.latest().then(() => knex.seed.run());
  });

  afterAll(() => {
    return knex.migrate.rollback().then(() => knex.destroy());
  });

  const transaction = {
    transaction_type_id: 1,
    date: '2020-01-01',
    description: 'Salário Mensal',
    installment_total: 1,
    amount: 1000,
  };

  const tags = [1, 2, 3];

  test('It should create a transaction with type Receita', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        tags,
        ...transaction,
      })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);

    const [transactionDb] = await knex('transactions')
      .select('*')
      .orderBy('id', 'desc')
      .limit(1);

    const transactionsTags = await knex('transactions_tags').where(
      'transaction_id',
      transactionDb.id
    );

    expect(transactionDb).toMatchObject(transaction);
    transactionsTags.forEach((item) => {
      expect(tags).toContain(item.tag_id);
    });
  });

  test('It should create a transaction with type Despesa', async () => {
    transaction.transaction_type_id = 2;
    transaction.description = 'Condomínio';
    transaction.amount = -300.59;

    const response = await request(app)
      .post('/transactions')
      .send({
        tags,
        ...transaction,
      })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);

    const [transactionDb] = await knex('transactions')
      .select('*')
      .orderBy('id', 'desc')
      .limit(1);

    const transactionsTags = await knex('transactions_tags').where(
      'transaction_id',
      transactionDb.id
    );

    expect(transactionDb).toMatchObject(transaction);
    transactionsTags.forEach((item) => {
      expect(tags).toContain(item.tag_id);
    });
  });

  test('It should create a transaction with multiple installments', async () => {
    transaction.transaction_type_id = 2;
    transaction.description = 'Iptu';
    transaction.installment_total = 12;
    transaction.amount = -88.94;

    const response = await request(app)
      .post('/transactions')
      .send({
        tags,
        ...transaction,
      })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);

    const transactionsDb = await knex('transactions')
      .select('*')
      .andWhere('description', 'Iptu')
      .andWhere('installment_total', 12);

    console.log(transactionsDb);

    // const transactionsTags = await knex('transactions_tags').where(
    //   'transaction_id',
    //   transactionDb.id
    // );

    // expect(transactionDb).toMatchObject(transaction);
    // transactionsTags.forEach((item) => {
    //   expect(tags).toContain(item.tag_id);
    // });
  });
});
