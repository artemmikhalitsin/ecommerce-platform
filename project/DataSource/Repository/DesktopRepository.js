'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

// TODO: I don't think this class is properly implemented - it has inconsistent
// variable usage and incomplete get method - Artem

/**
 * Repository for Desktops
 * @author TODO: IF YOU'RE THE AUTHOR, ATTRIBUTE THIS CLASS TO YOURSELF
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT - Artem
 */
class DesktopRepository {
  /**
   * Constructor initializes the repo's unit of work
   */
  constructor() {
    this.uow = new UnitOfWork();
  }

  /**
   * Retrieves all items from the Dekstop table of the database
   * @param {string} args TODO: Not sure what this argument is doing here??
   * @return {Promise} promise which resolves to the list of desktops in the
   * database
   */
  get(args) {
    return this.database('Desktop').select('*');
  }
}
module.exports = DesktopRepository;
