const tablename='Computer';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('compId').primary().notNullable().unsigned();
//      table.dropForeign('productdescriptionId', productdescriptionId);
      // Computer attributes
      table.string('processorType').notNullable();
      table.integer('ramSize').unsigned().notNullable();
      table.integer('numberCpuCores').unsigned().notNullable();
      table.integer('hardDriveSize').unsigned().notNullable();
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
