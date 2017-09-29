const tablename='Desktop'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.integer('dimension_id').unsigned().notNullable()
      table.string('inventory_id').notNullable()
      table.integer('computer_id').unsigned().notNullable()
      table.foreign('dimension_id').references('Dimension.id')
      table.foreign('inventory_id').references('InventoryItem.model_number')
      table.foreign('computer_id').references('Computer.id')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
