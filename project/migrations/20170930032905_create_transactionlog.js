/**
  @author Amanda Wai
  Creates the TransactionLog Table in the 343DB Database.
*/
const tablename='TransactionLog';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().primary();
      table.string('user_id').notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
