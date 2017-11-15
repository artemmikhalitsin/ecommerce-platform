'use strict';

var tablename = 'Dimensions';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tablename, function (table) {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('dimension_id').primary().notNullable().unsigned();

      // Dimension attributes
      table.decimal('depth').notNullable();
      table.decimal('height').notNullable();
      table.decimal('width').notNullable();
    }
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};