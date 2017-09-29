const tablename='Desktop'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.string('model_number').primary().notNullable()
    //  table.integer('dimension_id').unsigned().notNullable()
    //  table.string('inventory_id').notNullable()
    //  table.integer('computer_id').unsigned().notNullable()
    //  table.foreign('dimension_id').references('Dimension.id')
    //  table.foreign('inventory_id').references('InventoryItem.model_number')
    //  table.foreign('computer_id').references('Computer.id')
      table.decimal('price').notNullable()
      table.string('brand_name').notNullable()
      table.decimal('weigh').notNullable()
      table.string('processor_type').notNullable()
      table.int('ram_size').notNullable()
      table.int('number_cpu_cores').notNullable()
      table.int('harddrive_size').notNullable()
      table.decimal('depth').notNullable()
      table.decimal('height').notNullable()
      table.decimal('width').notNullable()
      table.boolean('is_available').defaultTo(True)
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
