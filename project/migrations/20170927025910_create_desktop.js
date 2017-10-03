const tablename='Desktop';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      // InventoryItem attributes
      table.string('model_number').primary().notNullable();
      table.string('brand_name').notNullable();
      table.decimal('price').notNullable();
      table.decimal('weight').notNullable();
      table.boolean('is_available').defaultTo(true);

      // Computer attributes
      table.string('processor_type').notNullable();
      table.integer('ram_size').unsigned().notNullable();
      table.integer('number_cpu_cores').unsigned().notNullable();
      table.integer('harddrive_size').unsigned().notNullable();

      // Dimsneions attributes
      table.decimal('depth').notNullable();
      table.decimal('height').notNullable();
      table.decimal('width').notNullable();
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
