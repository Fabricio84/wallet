import knex from 'knex';
import config from '../../knexfile';

export default process.env.NODE_ENV === 'dev'
  ? knex(config.dev)
  : knex(config.test);
