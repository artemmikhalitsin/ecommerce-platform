'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway of inventory items table
 * @author TODO: IF YOU WROTE THIS PLEASE ADD YOUR NAME
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE correct
 * REVIEW: PLEASE VERIFY TYPES OF PROMISES - Artem
 */
class InventoryItemsTDG {
    /**
     * Adds a new item into the table
     * @param {string} serialNumber The unique serial number of the item
     * @param {string} modelNumber The model number to associate the serial to
     * @return {Promise<number[]>} a promise which resolves to an array
     * containing the id of the inserted item in the table
     */
    add(serialNumber, modelNumber) {
        return connection.insert({
            'serial_number': serialNumber,
            'model_number': modelNumber,
          }, 'id')
        .into('Inventory');
    }

    /**
     * Gets all items from the table
     * @return {Promise<Object[]>} a promise which resolves to an array of items
     */
    select() {
        return connection('Inventory').select('*');
    }
    getByModelNumbers(modelNumbers) {
        return connection('Inventory').select('*')
          .whereIn('model_number', modelNumbers);
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
    delete(inventoryItem) {
        return connection.from('Inventory').where(
          {'serial_number': inventoryItem.serialNumber,
           'model_number': inventoryItem.modelNumber}
        ).del();
    }
}
module.exports = InventoryItemsTDG;
