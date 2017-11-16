const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

class UsersTDG{
  /**
   * Adds a new user into the table
   * @param {integer} id The unique id of the user
   * @return {Promise<number[]>} a promise which resolves to an array
   * containing the id of the inserted user in the table
   */
  add(user){
    return connnection.inser({
      'first_name': user.first_name,
      'last_name': user.last_name,
      'full_address': user.full_address,
      'email': user.email,
      'phone_number': user.phone_number,
      'password': user.password,
    //  'is_admin' : user.is_admin = false,
    }, 'id').into('Users');
  }
  /**
   * Deletes an item from the inventory given an id
   * @param {id} user the id of the user to be deleted,
   * as it appears in the table
   * @return {Promise<number>} a promise which resolves to the id of user
   * affected
   */
  delete(user){
    return connection.from('Users'). where(
      {id: user.id}
    ).del();
  }
}

module.exports = UsersTDG;
