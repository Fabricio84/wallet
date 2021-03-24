const request = require('supertest');
import app from '../src/app';
import knex from '../src/database/connections';

describe('Test server', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test sigin routes', () => {
  beforeAll(async () => {
    return knex.migrate.latest().then(() => knex.seed.run());
  });

  afterAll(() => {
    return knex.migrate.rollback().then(() => knex.destroy());
  });

  test('It should response the GET token JWT', async () => {
    const payload = {
      email: 'teste@teste.com.br',
      password: 'teste'
    };

    await knex('users').insert({
      name: 'teste',
      ...payload
    });

    const response = await request(app)
    .post('/sigin')
    .send(payload)
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'teste');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.accessToken.length).toBeGreaterThanOrEqual(120);
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

    expect(transactionsDb.length).toEqual(12);

    let seekDate = new Date(`${transaction.date} 01:00`);
    let seekInstallment = 1;

    const transactionIds: Number[] = [];
    transactionsDb.forEach(
      ({
        id,
        transaction_type_id,
        description,
        installment_total,
        amount,
        date,
        installment,
      }) => {
        expect(transaction_type_id).toEqual(2);
        expect(description).toEqual('Iptu');
        expect(installment_total).toEqual(12);
        expect(amount).toEqual(-88.94);

        expect(date).toEqual(seekDate.toISOString().split('T')[0]);
        expect(installment).toEqual(seekInstallment);

        seekDate.setMonth(seekDate.getMonth() + 1);
        seekInstallment++;

        transactionIds.push(id);
      }
    );

    const transactionsTags = await knex('transactions_tags').whereIn(
      'transaction_id',
      transactionIds
    );

    transactionIds.forEach((id) => {
      const tagsDb = transactionsTags
        .filter(({ transaction_id }) => transaction_id === id)
        .map(({ tag_id }) => tag_id);

      expect(tags).toEqual(tagsDb);
    });
  });

  test('It should list transactions', async () => {
    const response = await request(app).get('/transactions');

    expect(response.statusCode).toBe(200);

    const transactionsDb = await knex('transactions')
      .select('*')
      .orderBy('date');

    expect(response.body.length).toEqual(transactionsDb.length);
    transactionsDb.forEach((transaction, index) => {
      expect(transaction).toMatchObject(response.body[index]);
    });
  });
});
