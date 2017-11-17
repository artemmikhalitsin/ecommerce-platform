const tablename='Computer';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('comp_id').primary().notNullable().unsigned();
//      table.dropForeign('productdescription_id', productdescription_id);
      // Computer attributes
      table.string('processor_type').notNullable();
      table.integer('ram_size').unsigned().notNullable();
      table.integer('number_cpu_cores').unsigned().notNullable();
      table.integer('harddrive_size').unsigned().notNullable();
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
