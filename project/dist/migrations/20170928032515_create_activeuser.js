'use strict';

var tablename = 'ActiveUser';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tablename, function (table) {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().notNullable();
      table.timestamp('logged_at').defaultTo(knex.fn.now());
      table.foreign('user_id').references('User.id');
      // NOTE: I added a foreign key not reflected in the DOM here (Artem)
      // table.integer('purchase_id').unsigned().notNullable()
      // table.foreign('purchase_id').references('Purchase.id')
    }
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};