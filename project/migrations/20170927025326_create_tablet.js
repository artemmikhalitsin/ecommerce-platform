const tablename='Tablet'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.integer('dimensions').unsigned().notNullable()
      table.foreign('dimensions').references('Dimension.id')
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
