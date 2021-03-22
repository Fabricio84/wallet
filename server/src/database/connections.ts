import knex from 'knex';
const config = require('../../knexfile');

export default process.env.NODE_ENV === 'dev'
  ? knex(config.dev)
  : knex(config.test);
