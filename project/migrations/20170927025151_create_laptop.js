const tablename='Laptop';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      // InventoryItem attributes
      table.increments('id').primary().notNullable().unsigned();
      table.integer('compId').notNullable().unsigned();
      table.foreign('compId').references('Computer.compId');
      table.string('modelNumber').notNullable();
      table.foreign('modelNumber').references('ProductDescription.modelNumber');
  //    table.string('modelNumber').references('ProductDescription.modelNumber').notNullable();
//      table.foreign('lap_id').references('Computer.compId');
      // Laptop attributes
      table.decimal('displaySize').notNullable();
      table.string('batteryInfo').notNullable();
      table.string('os').notNullable();
      table.boolean('camera').notNullable().defaultTo(false);
      table.boolean('touchScreen').notNullable().defaultTo(false);
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
