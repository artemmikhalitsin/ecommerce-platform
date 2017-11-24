'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway of TransactionLog
 * @author Amanda Wai
 */
class TransactionLogTDG {
    /**
     * Adds a new transaction into the table
     * @param {Object} transaction The client's email
     * @return {Promise<number>} a promise which resolves to the id of the
     * inserted item in the table
     */
    static add(transaction) {
        return connection.insert({
            'userID': transaction.client,
            'timestamp': transaction.timestamp,
          }, 'id')
        .into('TransactionLog');
    }

    /**
     * Gets all items from the TransactionLogTDG table
     * @param {String} user clients userID
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    static select(user) {
        return connection('TransactionLog').select('*')
            .where({'userID': user});
    }


    /**
     * Gets all items from the TransactionLog table
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    static getAllTransactions() {
        return connection('Transaction').select('*');
    }
}
module.exports = TransactionLogTDG;
