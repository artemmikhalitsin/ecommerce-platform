const tablename='Desktop'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {

      //InventoryItem attributes
      table.string('model_number').primary().notNullable()
      table.string('brand_name').notNullable()
      table.decimal('price').notNullable()
      table.decimal('weigh').notNullable()
      table.boolean('is_available').defaultTo(True)

      //Computer attributes
      table.string('processor_type').notNullable()
      table.int('ram_size').unsigned().notNullable()
      table.int('number_cpu_cores').unsigned().notNullable()
      table.int('harddrive_size').unsigned().notNullable()

      //Dimsneions attributes
      table.decimal('depth').notNullable()
      table.decimal('height').notNullable()
      table.decimal('width').notNullable()
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
