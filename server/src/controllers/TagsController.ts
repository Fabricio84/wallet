import { Request, Response } from 'express';
import knex from '../database/connections';

interface Tags {
  id: Number;
  name: String;
}

class TagsController {
  async index(request: Request, response: Response) {
    console.log('tags>index');
    const points = await knex('tags').select('tags.*').orderBy('name');
    return response.json(points);
  }
  async show(request: Request, response: Response) {}
  async create(request: Request, response: Response) {}
}

export default TagsController;
