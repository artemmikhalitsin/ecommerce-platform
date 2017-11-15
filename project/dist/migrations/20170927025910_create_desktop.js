'use strict';

var tablename = 'Desktop';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tablename, function (table) {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').primary().notNullable().unsigned();
      table.integer('comp_id').notNullable().unsigned();
      table.foreign('comp_id').references('Computer.comp_id');
      table.string('model_number').notNullable();
      table.foreign('model_number').references('ProductDescription.model_number');
      table.integer('dimension_id').notNullable().unsigned();
      table.foreign('dimension_id').references('Dimensions.dimension_id');
    }
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};