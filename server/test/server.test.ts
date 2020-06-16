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

  const payload = {
    transaction_type_id: 1,
    description: 'Salário Mensal',
    installment_total: 1,
    amount: 1000,
    tags: [1, 2, 3],
  };

  test('It should create a transaction with type Receita', async () => {
    const response = await request(app)
      .post('/transactions')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
  });

  test('It should create a transaction with type Despesa', async () => {
    payload.transaction_type_id = 2;
    payload.description = 'Condomínio';
    payload.tags = [4, 5, 6];

    const response = await request(app)
      .post('/transactions')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
  });

  test('It should create a transaction with multiple installments', async () => {
    payload.transaction_type_id = 2;
    payload.description = 'Iptu';
    payload.installment_total = 12;
    payload.tags = [4, 5, 6];

    const response = await request(app)
      .post('/transactions')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
  });
});
