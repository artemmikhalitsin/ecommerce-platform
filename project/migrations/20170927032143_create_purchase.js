const tablename='Purchase'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      //NOTE: A purchase should probably have an ID? (Artem)
      table.increments('id').unsigned().primary()
      /*NOTE: I altered the design here. Only clients can make
      purchases (As per specifications)*/
      table.integer('client').unsigned().notNullable()
      table.foreign('client').references('Client.id')
      table.integer('inventory_item').unsigned().notNullable()
      table.foreign('inventory_item').references('InventoryItem.id')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
