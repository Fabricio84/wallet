import { Request, Response } from 'express';
import knex from '../database/connection';

class TransactionsController {
  async index(request: Request, response: Response) {}
  async show(request: Request, response: Response) {}
  async create(request: Request, response: Response) {}
}

export default TransactionsController;
