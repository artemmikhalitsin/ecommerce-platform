const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const Desktop = require(rootPath + '/models/User.js');

class UsersTDG {
    /**
     * Adds a new item into the table
     * @param {string} serialNumber The unique serial number of the item
     * @param {string} modelNumber The model number to associate the serial to
     * @return {Promise<number[]>} a promise which resolves to an array
     * containing the id of the inserted item in the table
     */
    add(first_name, last_name, email, password, full_address, phone_number) {
        return connection.insert({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'password': user.password,
            'full_address': user.full_address,
            'phone_number': user.phone_number,
          }, 'id')
        .into('Users');
    }

    /**
     * Gets all items from the table
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    select() {
        return connection('Users').select('*');
    }
    getByEmail(email) {
        return connection('Users').select('*')
          .whereIn('email', email);
    }

    getByEmailAndPassword() {
      return connection('Users').select('*').whereIn('email', email, 'password', password);
    }

    getAllClients() {
      return connection('Users').select('*').whereIn('is_admin', 0);
    }

    getAll() {
      let results = [];
      return connection('Users').select('*').then((user) => {
        user.forEach(function(user) {
          results.push(new User(
            user.first_name,
            user.last_name,
            user.email,
            user.password,
            user.full_address,
            user.phone_number,
            user.is_admin
          ));
        });
        return results;
      });
    }

    /**
     * Deletes an item from the inventory given an id
     * @param {number} inventoryItem the id of the item to be deleted,
     * as it appears in the table
     * @return {Promise<number>} a promise which resolves to the number of rows
     * affected
     */
    delete(email) {
        console.log(User);
        console.log('in UsersTDG');
        return connection.from('Users').where(
          {'email': user.email}
        ).del();
    }
}
module.exports = UsersTDG;
