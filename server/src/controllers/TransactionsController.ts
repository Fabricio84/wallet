import { Request, Response } from 'express';
import knex from '../database/connection';

interface TransactionsTags {
  transaction_id: Number;
  tag_id: Number;
}

class TransactionsController {
  async index(request: Request, response: Response) {}
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

    const transactions = [];

    let seekDate = new Date(`${date} 01:00`);

    for (let index = 0; index < installment_total; index++) {
      transactions.push({
        transaction_type_id,
        date: seekDate.toISOString().split('T')[0],
        description,
        installment: index + 1,
        installment_total,
        amount,
      });

      seekDate.setMonth(seekDate.getMonth() + 1);
    }

    const trx = await knex.transaction();

    try {
      const transactionsIds = await trx('transactions').insert(transactions);

      const transactionsTags = Array<TransactionsTags>();
      transactionsIds.forEach((transaction_id) => {
        tags.forEach((tag_id: number) => {
          transactionsTags.push({
            transaction_id,
            tag_id,
          });
        });
      });

      await trx('transactions_tags').insert(transactionsTags);

      await trx.commit();

      return response.status(200).end();
    } catch (error) {
      await trx.rollback();
      return response.status(500).json(error);
    }
  }
}

export default TransactionsController;
