const tablename='ShoppingCartItem'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      //NOTE: I added a foreign key not reflected in the DOM here (Artem)
      table.integer('purchase_id').unsigned().notNullable()
      table.foreign('purchase_id').references('Purchase.id')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
