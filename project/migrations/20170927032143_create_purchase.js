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
      //table.integer('client').unsigned().notNullable()
      //table.foreign('client').references('Client.id')
      table.string('inventory_id').notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('inventory_id').references('InventoryItem.model_number')
      table.foreign('user_id').references('User.id')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
