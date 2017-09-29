const mysqlOptions = {
     client: 'mysql',
     connection:{
          host: 'localhost',
          user: 'root',
          password: '343docker',
          database: '343DB'
     }
}
const mysql = require('knex')(mysqlOptions)

mysql.schema.createTableIfNotExists('customers', (table)=>{
     if(!table){
          console.log("Error creating table")
     }
     else{
          table.increments()
          table.string('name')
          table.string('address')
     }
}).then( () => {
     customer = {
          name: 'Davey Jones',
          address: 'His Locker'
     }

     console.log("Inserting Davey Jones")
     mysql('customers').insert(customer).then((res) =>{
          console.log(res)
     })

     mysql.select('*').from('customers').then((rows) => {
          console.log(rows)
     })
})
