'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var database = require('knex')(configuration);
var UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

/**
 * Repository for users
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */

var UserRepository = function () {
  /**
   * Constructor initiates a new unit of work
   */
  function UserRepository() {
    _classCallCheck(this, UserRepository);

    this.uow = new UnitOfWork();
  }
  /**
   * Saves a user into the database
   * @param {Object} user the user to be saved into the database
   * @return {Promise<number[]>} promise which resolves to the list containing
   * the id of the inserted user
   */


  _createClass(UserRepository, [{
    key: 'save',
    value: function save(user) {
      return database('User').insert(user);
    }
  }, {
    key: 'get',


    /**
     * Retrieves all users from the database
     * @return {Promise<Object[]>} promise which resolves to the list of users
     * in the database
     */
    value: function get() {
      return database('User').select('*');
    }

    /**
     * Attempts to find the a user in the database with the given credentials
     * @param {Object} user contains the user's email and password
     * @return {Promise<Object[]>} promise which resolves to the list containing
     * the user object which matches the given credentials, if exists
     */

  }, {
    key: 'authenticate',
    value: function authenticate(user) {
      return database('User').where({
        email: user.email,
        password: user.password
      });
    }

    /**
     * Finds a user with the given email in the database
     * @param {string} email email of the user to be found
     * @return {Promise<Object[]>} promise which resolves to the list containing
     * the user with the given email, if exists
     */

  }, {
    key: 'verifyEmail',
    value: function verifyEmail(email) {
      return database('User').where({
        email: email
      });
    }
  }]);

  return UserRepository;
}();

module.exports = UserRepository;