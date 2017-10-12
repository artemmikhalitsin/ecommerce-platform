const tablename='TV';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.integer('id').primary().notNullable().unsigned();
      table.string('model_number').notNullable();
      table.foreign('model_number').references('ProductDescription.model_number');

      // TV Attributes
      table.string('category_name').notNullable();

      // Dimension attributes
      table.decimal('depth').notNullable();
      table.decimal('height').notNullable();
      table.decimal('width').notNullable();
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
