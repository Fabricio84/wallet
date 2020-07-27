import { Request, Response } from 'express';
import knex from '../database/connection';

interface TransactionsTags {
  transaction_id: Number;
  tag_id: Number;
}

class TransactionsController {
  async index(request: Request, response: Response) {
    console.log('transactions>index');

    const { page = 1 } = request.query;
    const [count] = await knex('transactions').count();

    const items = await knex('transactions')
      .limit(5)
      .offset((Number(page) - 1) * 5)
      .select('*')
      .orderBy('date');

    response.header('X-Total-Count', count['count(*)']);

    return response.json(items);
  }
  async show(request: Request, response: Response) {}
  async create(request: Request, response: Response) {
    const {
      transaction_type_id,
      date,
      description,
      installment_total,
      amount,
      tags,
    } = request.body;

    const trx = await knex.transaction();

    try {
      const transactionsTags: TransactionsTags[] = [];

      let seekDate = new Date(`${date} 01:00`);

      for (let index = 0; index < installment_total; index++) {
        const [transaction_id] = await trx('transactions').insert({
          transaction_type_id,
          date: seekDate.toISOString().split('T')[0],
          description,
          installment: index + 1,
          installment_total,
          amount,
        });

        tags.forEach((tag_id: number) => {
          transactionsTags.push({
            transaction_id,
            tag_id,
          });
        });

        seekDate.setMonth(seekDate.getMonth() + 1);
      }
      await trx('transactions_tags').insert(transactionsTags);

      await trx.commit();
      console.log('>transactions:create=OK');
      return response.status(200).end();
    } catch (error) {
      await trx.rollback();
      console.log('>transactions:create=ERROR');
      console.log(error);
      return response.status(500).json(error);
    }
  }
}

export default TransactionsController;
