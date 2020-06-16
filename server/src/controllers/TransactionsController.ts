import { Request, Response } from 'express';
import knex from '../database/connection';

class TransactionsController {
  async index(request: Request, response: Response) {}
  async show(request: Request, response: Response) {}
  async create(request: Request, response: Response) {
    const {
      transaction_type_id,
      description,
      installment_total,
      amount,
      tags,
    } = request.body;

    // getting balance

    const transactions = [];

    for (let index = 0; index < installment_total; index++) {
      transactions.push({
        transaction_type_id,
        description,
        installment: index,
        installment_total,
        amount,
        balance: 0,
      });
    }

    const trx = await knex.transaction();

    const insertedIds = await trx('transactions').insert(transactions);

    const transactionsTags: Readonly<Readonly<
      Partial<import('knex').MaybeRawRecord<any>>
    >> = [];
    insertedIds.forEach((transaction_id) => {
      tags.forEach((tag_id: number) => {
        transactionsTags.push({
          transaction_id,
          tag_id,
        });
      });
    });

    await trx('transactions_tags').insert(transactionsTags);

    await trx.commit();

    return response.json({
      transactions,
    });
  }
}

export default TransactionsController;
