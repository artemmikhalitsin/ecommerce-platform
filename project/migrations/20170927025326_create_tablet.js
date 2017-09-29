const tablename='Tablet'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      //InventoryItem attributes
      table.string('model_number').primary()
      table.string('brand_name').notNullable()
      table.decimal('price').notNullable()
      table.decimal('weight').notNullable()
      table.boolean('is_availble').notNullable().defaultTo(true)

      //Computer attributes
      table.string('processor_type').notNullable()
      table.int('ram_size').unsigned().notNullable()
      table.int('number_cpu_cores').unsigned().notNullable()
      table.int('harddrive_size').unsigned().notNullable()


      //Tablet attributes
      table.decimal('display_size').notNullable()
      table.string('battery_info').nullable()
      table.string('os').notNullable()
      table.string('camera_info').nullable()
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
