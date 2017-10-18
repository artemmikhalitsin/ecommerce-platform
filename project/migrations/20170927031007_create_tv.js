const tablename='TV';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').primary().notNullable().unsigned();
      table.string('model_number').notNullable();
      table.foreign('model_number').references('ProductDescription.model_number');
      table.integer('dimension_id').notNullable().unsigned();
      table.foreign('dimension_id').references('Dimensions.dimension_id');

      // TV Attributes
      table.string('category_name').notNullable();
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
