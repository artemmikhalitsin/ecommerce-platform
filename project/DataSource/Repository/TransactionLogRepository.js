'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const transactionLogTDG = require(rootPath +
  '/DataSource/TableDataGateway/TransactionLogTDG.js');

// Forward declaration of singleton instance reference
let _instance;
/**
 * Repository for Inventory Items
 * @author Amanda Wai
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */
class TransactionLogRepository {
  /**
   * Constructor initializes the unit of work and tdg
   */
  constructor() {
    this.uow = new UnitOfWork();
  }
  /**
   * Retrieves current instance of the repository, or if one doesnt
   * exist, instantiates it
   * @return {Object} a reference to the current instance of the repo
   */
  static instance() {
    if (!_instance) {
      _instance = new TransactionLogRepository();
    }
    return _instance;
  }
  /**
   * Retrieves all items from the database table
   * @return {Promise<Object[]>} promise which resolves to the list of inventory
   * items in the database
   */
  getAllTransactions() {
    return database('TransactionLog').select('*');
  }

  /**
   * Saving a transaction to the database
   * @param {Object[]} transaction
   */
  save(transaction) {
    this.uow.registerTransaction(transaction);
    this.uow.commitAll();
  }
}
module.exports = TransactionLogRepository;
