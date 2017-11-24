const tablename='Desktop';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').primary().notNullable().unsigned();
      table.integer('compId').notNullable().unsigned();
      table.foreign('compId').references('Computer.compId');
      table.string('modelNumber').notNullable();
      table.foreign('modelNumber').references('ProductDescription.modelNumber');
      table.integer('dimensionId').notNullable().unsigned();
      table.foreign('dimensionId').references('Dimensions.dimensionId');
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
