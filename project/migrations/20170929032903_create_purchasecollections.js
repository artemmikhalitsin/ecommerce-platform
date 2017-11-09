/**
  @author Michael Li
  Creates the PurchaseCollection Table in the 343DB Database.
*/
const tablename='PurchaseCollection';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().primary();
      table.string('user_id').notNullable();
      table.foreign('user_id').references('User.id');
      table.string('serial_number').notNullable().unique();
      table.string('model_number').notNullable();
      table.foreign('model_number')
        .references('ProductDescription.model_number');
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
