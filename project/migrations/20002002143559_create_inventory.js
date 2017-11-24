const tablename='Inventory';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().primary();
      table.string('serialNumber').notNullable().unique();
      table.string('modelNumber').notNullable();
      table.foreign('modelNumber')
        .references('ProductDescription.modelNumber');
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
