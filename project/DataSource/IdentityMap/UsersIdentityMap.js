'use strict';
/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
// Singleton class
let _instance;

class UsersIdentityMap {
  /**
   * Creates an inventory item identity map
   */
  constructor() {
    this.users = [];
  }

  /**
   * Lazily instantiates an instance of the class
   * @return {Object} the current instance of the class
   */
  static instance() {
    if (!_instance) {
      _instance = new UsersIdentityMap();
    }
    return _instance;
  }

  /**
   * Gets all users from the identity map
   * @return {Object[]} a list of users
   */
  getAll() {
    return this.users;
  }

  /**
   * Gets all users matching an email criteria
   * @param {String} email
   * @return {Object[]}  a list of users
   */
  getByEmail(email) {
    return this.users.filter((user) => {
      return email.includes(user.email);
    });
  }

  /**
   * Gets the first user matching the email and password criteria in the map
   * @param {String} email
   * @param {String} password
   * @return {Object} a user
   */
  getByEmailAndPassword(email, password) {
    return this.users.find(
      (user) => {
        return (user.email == email && user.password == password);
      }
    );
  }

  /**
     * Adds new objects into the identity map
     * @param {Object[]} newUsers
     * @param {Object[]} newInventoryItems a list containing new items
     */
  add(newUsers) {
    for (let i = 0; i < newUsers.length; i++) {
      let user = newUsers[i];
      if (!this.users.includes(user.email)) {
        this.users.push(Object.assign({}, user));
      }
    }
  }

  /**
   * Deletes users from the identity map, given a list of user specifications
   * @param {Object[]} deleteUsers
   * @param {Object[]} a list of users to be deleted
   */
  delete(deleteUsers) {
    this.users = this.users.filter(
      (user) => {
        return !deleteUsers.includes(user.email);
    });
  }
}
module.exports = UsersIdentityMap;
