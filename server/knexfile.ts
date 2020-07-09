import path from 'path';

const defaults = {
  client: 'sqlite3',
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};

module.exports = {
  dev: {
    ...defaults,
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
  },
  test: {
    ...defaults,
    connection: ':memory:',
  },
};
