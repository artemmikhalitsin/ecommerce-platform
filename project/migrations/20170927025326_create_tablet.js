const tablename='Tablet';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {

      table.integer('id').primary().notNullable().unsigned();
      table.integer('comp_id').notNullable().unsigned();
      table.foreign('comp_id').references('Computer.comp_id');
      table.string('model_number').notNullable();
      table.foreign('model_number').references('ProductDescription.model_number');

      // Tablet attributes
      table.decimal('display_size').notNullable();
      table.string('battery_info').nullable();
      table.string('os').notNullable();
      table.string('camera_info').nullable();

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
