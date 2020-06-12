import express, { Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  return response.end('Wallet server is working...');
});

app.use(errors());

module.exports = app;
