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
     * @return {Promise<number[]>} a promise which resolves to an array
     * containing the id of the inserted item in the table
     */
    add(clientID, serialNumber, modelNumber) {
        return connection.insert({
            'user_id': clientID,
            'serial_number': serialNumber,
            'model_number': modelNumber,
          }, 'id')
        .into('PurchaseCollection');
    }

    /**
     * Gets all items from the table
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    select() {
        return connection('PurchaseCollection').select('*');
    }
    // update is not in current requirements for inventory items
    /* update(inventoryItems){
    }*/

    /**
     * Deletes an item from the inventory given an id
     * @param {number} inventoryItem the id of the item to be deleted,
     * as it appears in the table
     * @return {Promise<number>} a promise which resolves to the number of rows
     * affected
     */

    /**delete(inventoryItem) {
        // TODO Need to implement for returns.
        return connection.from('PurchaseCollection').where({id: inventoryItem.id}).del();
    }
    */
}
module.exports = PurchaseCollectionTDG;
