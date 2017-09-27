const tablename = 'Computer'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.string('processor_type').notNullable()
      table.integer('ram_size').unsigned().notNullable()
      table.integer('number_cpu_cores').unsigned().notNullable()
      table.integer('harddrive_size').unsigned().notNullable()
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
