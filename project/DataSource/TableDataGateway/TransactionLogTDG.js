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
     * @return {Promise<number[]>} a promise which resolves to an array
     * containing the id of the inserted item in the table
     */
    add(transaction) {
        return connection.insert({
            'user_id': transaction.client,
            'timestamp': transaction.timestamp,
          }, 'id')
        .into('TransactionLog');
    }

    /**
     * Gets all items from the TransactionLogTDG table
     * @param {String} user clients user_id 
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    select(user) {
        return connection('TransactionLog').select('*')
            .where({'user_id': user});
    }


    /**
     * Gets all items from the TransactionLog table
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    getAllTransactions() {
        return connection('Transaction').select('*');
    }
}
module.exports = TransactionLogTDG;
