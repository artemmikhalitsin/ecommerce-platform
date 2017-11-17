'use strict';
/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
//Singleton class
let _instance;

class UsersIdentityMap {
  /**
     * Creates an inventory item identity map
     */
  constructor() {
    this.users = [];
  }

  static instance() {xxxvvvv
    if (!_instance) {
      _instance = new UsersIdentityMap();
    }
    return _instance;
  }

  getAll() {
    return this.users;
  }

  getbyEmail(email) {
    return this.users.filter((item) => {
      return email.includes(user.email)
    });
  }
  getbyEmailAndPassword(email, password) {
    for (var i = 0; i < users.length; i++) {
      let findUser = users[i];
      if (findUser.email == email && findUser.password == password) {
        return user[i];
      }
    }
  }

  /**
     * Adds new objects into the identity map
     * @param {Object[]} newInventoryItems a list containing new items
     */
  add(newUser) {
    if (!this.users.includes(user.email)) {
      this.users.push(newUser);
    }
  }

  delete(deleteUser) {
    this.users = this.users.filter((deleteUser) => {
      return !users.includes(item.email);
    })
  }
}
module.exports = UsersIdentityMap;
