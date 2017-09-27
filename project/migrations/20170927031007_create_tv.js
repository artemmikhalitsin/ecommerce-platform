const tablename='TV'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().primary()
      table.integer('dimensions').unsigned().notNullable()
      table.foreign('dimensions').references('Dimension.id')
      //NOTE: I really think this should be an enum (Artem)
      table.string('category_name').notNullable()
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
