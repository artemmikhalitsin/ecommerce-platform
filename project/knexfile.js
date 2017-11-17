// Update with your config settings.
require('babel-register');
module.exports = {

  development: {
    client: 'mysql',
    connection: {
         host: 'localhost',
         user: 'root',
         password: '343docker',
         database: '343DB',
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
    client: 'mysql',
    connection: {
         host: 'localhost',
         user: 'root',
         password: '343docker',
         database: '343DB',
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
    client: 'mysql',
    connection: {
         host: 'localhost',
         user: 'root',
         password: '343docker',
         database: '343DB',
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
