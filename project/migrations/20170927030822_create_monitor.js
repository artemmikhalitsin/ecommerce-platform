const tablename='Monitor'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.string('inventory_id').notNullable()
      table.decimal('display_size').notNullable()
      table.foreign('inventory_id').references('InventoryItem.model_number')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
