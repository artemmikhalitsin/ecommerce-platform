const tablename='Laptop';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      // InventoryItem attributes
      table.string('model_number').primary();
      table.string('brand_name').notNullable();
      table.decimal('price').notNullable();
      table.decimal('weight').notNullable();
      table.boolean('is_available').notNullable().defaultTo(true);

      // Computer attributes
      table.string('processor_type').notNullable();
      table.integer('ram_size').unsigned().notNullable();
      table.integer('number_cpu_cores').unsigned().notNullable();
      table.integer('harddrive_size').unsigned().notNullable();

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
