'use strict';

const knex = require('knex');
const mockKnex = require('mock-knex');
let connection;

if (process.env.NODE_ENV === 'test') {
    connection = knex({client: 'mysql', debug: false});
    mockKnex.mock(connection, 'knex@0.10');
} else {
    connection = knex({
        client: 'mysql',
        debug: true,
        connection: process.env.MYSQL_DATABASE_CONNECTION,
    });
}

module.exports = connection;
