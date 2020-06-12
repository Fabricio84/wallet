import { Express } from 'express';
const app = require('./app') as Express;

app.listen(3333, () => {
  console.log('Wallet Server is working on port 3333');
});
