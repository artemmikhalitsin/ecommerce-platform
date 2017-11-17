'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const TransactionLogTDG = require(rootPath +
  '/DataSource/TableDataGateway/TransactionLogTDG.js');

/**
 * Repository for Inventory Items
 * @author Amanda Wai
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */
class TransactionLogRepo {
  /**
   * Constructor initializes the unit of work and tdg
   */
  constructor() {
    this.uow = new UnitOfWork();
    this.transactionLogTDG = new TransactionLogTDG();
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
module.exports = TransactionLogRepo;
