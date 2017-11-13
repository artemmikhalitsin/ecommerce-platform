const tablename='Inventory';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().primary();
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
