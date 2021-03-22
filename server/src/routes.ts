import express, { Request, Response } from 'express';
import knex from './database/connections';
import { celebrate, Joi } from 'celebrate';

import AccountController from './controllers/AccountController';
import TagsController from './controllers/TagsController';
import TransactionsController from './controllers/TransactionsController';

const routes = express.Router();

const accountController = new AccountController();
const tagsController = new TagsController();
const transactionsController = new TransactionsController();

routes.get('/', (request: Request, response: Response) => {
  return response.end('Wallet server is working...');
});

routes.post('/sigin', accountController.authenticate);

routes.get('/tags', tagsController.index);
routes.post('/transactions', transactionsController.create);
routes.get('/transactions', transactionsController.index);

export default routes;
