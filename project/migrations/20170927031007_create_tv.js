const tablename='TV'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.integer('dimension_id').unsigned().notNullable()
      table.string('inventory_id').notNullable()
      //NOTE: I really think this should be an enum (Artem)
      table.string('category_name').notNullable()
      table.foreign('dimension_id').references('Dimension.id')
      table.foreign('inventory_id').references('InventoryItem.model_number')
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
