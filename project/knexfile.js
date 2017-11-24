// Update with your config settings.
require('babel-register');
module.exports = {

  development: {
    client: 'pg',
    connection: {
         host: 'localhost',
         user: 'postgres',
         password: '343docker',
         database: 'db343',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'pg',
    connection: {
         host: 'localhost',
         user: 'postgres',
         password: '343docker',
         database: 'db343',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
         host: 'localhost',
         user: 'postgres',
         password: '343docker',
         database: 'db343',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
