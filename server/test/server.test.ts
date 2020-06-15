const request = require('supertest');
import app from '../src/app';
import connection from '../src/database/connection';

describe('Test server', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test transactions routes', () => {
  test('It should create a transaction with type Receita', async () => {
    const payload = {
      transaction_type_id: 1,
      description: 'Salário Mensal',
      installment: 1,
      installment_total: 1,
      amount: 1000,
      balance: 2000,
    };

    const response = await request(app)
      .post('/transactions')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
  });
});
