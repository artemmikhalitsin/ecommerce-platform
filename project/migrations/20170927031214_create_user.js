const tablename='User'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if(!table) {
      throw new Error('Error creating table ' + tablename)
    }
    else {
      table.increments('id').unsigned().notNullable().primary()
      table.string('email').unique().notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('password').notNullable()
      table.string('full_address').notNullable()
      table.integer('phone_number').unsigned().notNullable()
      table.boolean('is_admin').notNullable()
    }
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename)
}
