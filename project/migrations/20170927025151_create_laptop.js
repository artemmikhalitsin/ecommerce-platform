const tablename='Laptop';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      // InventoryItem attributes
      table.increments('id').primary().notNullable().unsigned();
      table.integer('comp_id').notNullable().unsigned();
      table.foreign('comp_id').references('Computer.comp_id');
      table.string('model_number').notNullable();
      table.foreign('model_number').references('ProductDescription.model_number');
  //    table.string('model_number').references('ProductDescription.model_number').notNullable();
//      table.foreign('lap_id').references('Computer.comp_id');
      // Laptop attributes
      table.decimal('display_size').notNullable();
      table.string('battery_info').notNullable();
      table.string('os').notNullable();
      table.boolean('camera').notNullable().defaultTo(false);
      table.boolean('touch_screen').notNullable().defaultTo(false);
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
