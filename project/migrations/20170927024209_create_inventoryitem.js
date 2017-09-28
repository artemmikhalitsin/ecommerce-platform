const tablename='InventoryItem'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.decimal('price').notNullable()
      table.decimal('weight').notNullable()
      table.string('brand_name').notNullable()
      table.boolean('is_available').notNullable().defaultTo(true)
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
