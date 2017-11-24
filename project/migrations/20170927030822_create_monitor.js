const tablename='Monitor';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').primary().notNullable().unsigned();
      table.string('modelNumber').notNullable();
      table.foreign('modelNumber').references('ProductDescription.modelNumber');


      // Monitor attributes
      table.decimal('displaySize').notNullable();
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
