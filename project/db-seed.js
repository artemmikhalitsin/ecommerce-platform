const options = {
  client: 'mysql',
  connection: {
       host: 'localhost',
       user: 'root',
       password: '343docker',
       database: '343DB',
  }
}

const knex =  require('knex')(options)

/*
table.increments('id').unsigned().primary()
table.string('email').notNullable()
table.string('first_name').notNullable()
table.string('last_name').notNullable()
table.string('password').notNullable()
table.string('full_address').notNullable()
table.boolean('is_admin').notNullable()
table.integer('phone_number').unsigned().notNullable()
*/

const user = {
  email: 'artem@gmail.com',
  first_name: 'Omondo',
  last_name: 'Wai',
  password: 'password',
  full_address: '123 Main',
  is_administrator: true,
  phone_number: 123123123
}

knex('User').select('*').then( (result) => {
  console.log(result)
})
