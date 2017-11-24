'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway of inventory items table
 * @author Michael Li
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE correct
 * REVIEW: PLEASE VERIFY TYPES OF PROMISES - Artem
 */
class PurchaseCollectionTDG {
    /**
     * Adds a new item into the table
     * @param {string} clientID The unique id of the client.
     * @param {string} serialNumber The unique serial number of the item
     * @param {string} modelNumber The model number to associate the serial to
     * @param {string} purchaseId The unique id for purchase item.
     * @return {Promise<number[]>} a promise which resolves to an array
     * containing the id of the inserted item in the table
     */
    // TODO: I'm not sure how purchases are structured, follow example in other
    // TDGs to implement this - Artem
    static add(clientID, serialNumber, modelNumber, purchaseId) {
        return connection.insert({
            'userID': clientID,
            'serialNumber': serialNumber,
            'modelNumber': modelNumber,
            'purchaseId': purchaseId,
          }, 'id')
        .into('PurchaseCollection');
    }

    /**
     * Gets all items from the Purchase Collection table
     * @param {number} user the id of the user to be fetched
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    static select(user) {
        return connection('PurchaseCollection')
          .select('*')
          .where({'userID': user});
    }

    /**
     * Deletes an item from the inventory given an id
     * @param {number} returnItem the id of the purchase item to be deleted,
     * as it appears in the table
     * @return {Promise<number>} a promise which resolves to the number of rows
     * affected
     */
    static delete(returnItem) {
        console.log(returnItem);
        console.log('in purchaseTDG');
        return connection.from('PurchaseCollection').where(
          {'purchaseId ': returnItem.purchase_Id,
            'serialNumber': returnItem.serialNumber}
        ).del();
    }
}
module.exports = PurchaseCollectionTDG;
