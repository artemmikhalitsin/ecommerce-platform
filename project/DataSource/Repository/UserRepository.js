<<<<<<< HEAD
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

/**
 * Repository for users
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */
class UserRepository {
  /**
   * Constructor initiates a new unit of work
   */
  constructor() {
    this.uow = new UnitOfWork();
  }
  /**
   * Saves a user into the database
   * @param {Object} user the user to be saved into the database
   * @return {Promise<number[]>} promise which resolves to the list containing
   * the id of the inserted user
   */
  save(user) {
    return database('User').insert(user);
  };

  /**
   * Retrieves all users from the database
   * @return {Promise<Object[]>} promise which resolves to the list of users
   * in the database
   */
  get() {
    return database('User').select('*');
  }

  /**
   * Attempts to find the a user in the database with the given credentials
   * @param {Object} user contains the user's email and password
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * the user object which matches the given credentials, if exists
   */
  authenticate(user) {
    return database('User').where({
      email: user.email,
      password: user.password,
    });
  }

  /**
   * Finds a user with the given email in the database
   * @param {string} email email of the user to be found
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * the user with the given email, if exists
   */
  verifyEmail(email) {
    return database('User').where({
      email: email,
    });
  }
}
module.exports = UserRepository;
=======
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

/**
 * Repository for users
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */
class UserRepository {
  /**
   * Constructor initiates a new unit of work
   */
  constructor() {
    this.uow = new UnitOfWork();
  }
  /**
   * Saves a user into the database
   * @param {Object} user the user to be saved into the database
   * @return {Promise<number[]>} promise which resolves to the list containing
   * the id of the inserted user
   */
  save(user) {
    return database('User').insert(user);
  };

  /**
   * Retrieves all users from the database
   * @return {Promise<Object[]>} promise which resolves to the list of users
   * in the database
   */
  get() {
    return database('User').select('*');
  }

  /**
   * Attempts to find the a user in the database with the given credentials
   * @param {Object} user contains the user's email and password
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * the user object which matches the given credentials, if exists
   */
  authenticate(user) {
    return database('User').where({
      email: user.email,
      password: user.password,
    });
  }

  /**
   * Finds a user with the given email in the database
   * @param {string} email email of the user to be found
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * the user with the given email, if exists
   */
  verifyEmail(email) {
    return database('User').where({
      email: email,
    });
  }
}
module.exports = UserRepository;
>>>>>>> d67e1d93899902e1989e506e5c4d369abe87ebc1
