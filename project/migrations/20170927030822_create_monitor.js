const tablename='Monitor';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {

      table.increments('id').primary().notNullable().unsigned();
      table.string('model_number').notNullable();
      table.foreign('model_number').references('ProductDescription.model_number');


      // Monitor attributes
      table.decimal('display_size').notNullable();
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
