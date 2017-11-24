const tablename='ProductDescription';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.string('modelNumber').primary().notNullable();

      // Product attributes
      table.string('brandName').notNullable();
      table.decimal('price').notNullable();
      table.decimal('weight').notNullable();
      table.string('type').notNullable();
      table.boolean('isAvailable').defaultTo(true);
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
