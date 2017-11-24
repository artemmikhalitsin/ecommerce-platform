const tablename='User';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().notNullable().primary();
      table.string('email').unique().notNullable();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('password').notNullable();
      table.string('fullAddress').notNullable();
      table.integer('phoneNumber').unsigned().notNullable();
      table.boolean('isAdmin').notNullable().defaultTo(false);
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
