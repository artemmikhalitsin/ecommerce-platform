const tablename='ActiveUser';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.increments('id').unsigned().primary();
      table.integer('userID').unsigned().notNullable();
      table.timestamp('loggedAt').defaultTo(knex.fn.now());
      table.foreign('userID').references('User.id');
      // NOTE: I added a foreign key not reflected in the DOM here (Artem)
      // table.integer('purchaseId').unsigned().notNullable()
      // table.foreign('purchaseId').references('Purchase.id')
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
