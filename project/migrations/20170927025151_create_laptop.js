const tablename='Laptop'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.decimal('display_size').notNullable()
      table.string('battery_info').notNullable()
      table.string('os').notNullable()
      table.integer('computer_id').unsigned().notNullable()
      table.string('inventory_id').notNullable()
      table.foreign('computer_id').references('Computer.id')
      table.foreign('inventory_id').references('InventoryItem.model_number')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
