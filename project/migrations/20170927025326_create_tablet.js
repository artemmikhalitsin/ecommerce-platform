const tablename='Tablet'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.integer('computer_id').unsigned().notNullable()
      table.string('inventory_id').notNullable()
      table.integer('dimension_id').unsigned().notNullable()
      table.decimal('display_size').notNullable()
      table.string('battery_info').nullable()
      table.string('os').notNullable()
      table.string('camera_info').nullable()
      table.foreign('dimension_id').references('Dimension.id')
      table.foreign('computer_id').references('Computer.id')
      table.foreign('inventory_id').references('InventoryItem.model_number')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
