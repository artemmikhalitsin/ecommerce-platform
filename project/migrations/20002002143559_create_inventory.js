const tablename='Inventory';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().primary();
      table.string('description_id').notNullable();
      table.foreign('description_id').references('ProductDescription.model_number');

    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
