"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a User
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
var User = function () {
  /**
   * Given a user's info, creates a new user object
   * @param {string} email email of the user
   * @param {string} name user's full name
   * @param {string} address user's address
   * @param {string} password user's password
   * @param {boolean} isAdmin whether the user is an admin
   */
  function User(email, name, address, password, isAdmin) {
    _classCallCheck(this, User);

    this.email = email;
    this.name = name;
    this.address = address;
    this.password = password;
    this.isAdmin = isAdmin;
  }
  /**
   * email accessor
   * @return {string} the user's email
   */


  _createClass(User, [{
    key: "getEmail",
    value: function getEmail() {
      return this.email;
    }
    /**
     * name accessor
     * @return {string} the user's name
     */

  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
    /**
     * password accessor
     * @return {string} the user's password
     */

  }, {
    key: "getPassword",
    value: function getPassword() {
      return this.password;
    }
    /**
     * address accessor
     * @return {string} the user's address
     */

  }, {
    key: "getAddress",
    value: function getAddress() {
      return this.address;
    }
    /**
     * isAdmin accessor
     * @return {boolean} whether the user is an admin
     */

  }, {
    key: "getIsAdmin",
    value: function getIsAdmin() {
      return this.isAdmin;
    }

    /**
     * email mutator
     * @param {string} email user's new email
     */

  }, {
    key: "setEmail",
    value: function setEmail(email) {
      this.email = email;
    }
    /**
     * name mutator
     * @param {string} name user's new name
     */

  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
    }
    /**
     * password mutator
     * @param {string} password user's new password
     */

  }, {
    key: "setPassword",
    value: function setPassword(password) {
      this.password = password;
    }
    /**
     * address mutator
     * @param {string} address user's new address
     */

  }, {
    key: "setAddress",
    value: function setAddress(address) {
      this.address = address;
    }
    /**
     * email mutator
     * @param {boolean} isAdmin new specification of whether user is an admin
     */

  }, {
    key: "setIsAdmin",
    value: function setIsAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    }
  }]);

  return User;
}();

module.exports = User;