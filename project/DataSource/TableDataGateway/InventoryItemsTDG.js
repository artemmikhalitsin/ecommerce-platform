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
    static add(serialNumber, modelNumber) {
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
    static select() {
        return connection('Inventory').select('*');
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
<<<<<<< HEAD
    static delete(inventoryItem) {
        // TODO
        return connection.from('Inventory').where({id: inventoryItem.id}).del();
=======
    delete(inventoryItem) {
        return connection.from('Inventory').where(
          {serial_number: inventoryItem.serial_number}
        ).del();
>>>>>>> 3f6b6a4f2937135663f60fce5412b3cd4cef9518
    }
}
module.exports = InventoryItemsTDG;
