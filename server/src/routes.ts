import express, { Request, Response } from 'express';
import knex from './database/connection';
import { celebrate, Joi } from 'celebrate';

import TransactionsController from './controllers/TransactionsController';

const routes = express.Router();

const transactionsController = new TransactionsController();

routes.get('/', (request: Request, response: Response) => {
  return response.end('Wallet server is working...');
});

routes.post('/transactions', transactionsController.create);

export default routes;
