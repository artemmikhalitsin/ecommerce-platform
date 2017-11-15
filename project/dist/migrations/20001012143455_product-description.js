'use strict';

var tablename = 'ProductDescription';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tablename, function (table) {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.string('model_number').primary().notNullable();

      // Product attributes
      table.string('brand_name').notNullable();
      table.decimal('price').notNullable();
      table.decimal('weight').notNullable();
      table.string('type').notNullable();
      table.boolean('is_available').defaultTo(true);
    }
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};