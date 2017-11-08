const rootPath = require('app-root-dir').get();
// REVIEW: UnitOfWork is never used here, consider removing - Artem
// const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const InventoryItemsTDG = require(rootPath +
  '/DataSource/TableDataGateway/InventoryItemsTDG.js');

/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
class InventoryItemsIdentityMap {
    /**
     * Creates an inventory item identity map
     * Loads all inventory items from database into memory
     */
    constructor() {
        // Instance variables
        this.inventoryTDG = new InventoryItemsTDG();
        this.InventoryItems = [];

        let context = this.inventoryTDG.select();
        Promise.all([context])
        .then((values) => {
            this.InventoryItems = values[0];
        });
    }

    /**
     * Gets all the items currently stored in the Identity map
     * @return {Object[]} an array containing the items
     */
    getAll() {
        let result = this.InventoryItems;
        if (this.InventoryItems.length > 0) {
            return result;
        } else {
            let itemsFromTDG = this.inventoryTDG.select();
            Promise.all([itemsFromTDG])
            .then((values) => {
              result = values[0];
            });
            return result;
        }
    }

    /**
     * Gets a list of items matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of items corresponding to the given model
     * numbers
     */
    get(modelNumbers) {
        return this.InventoryItems.filter(
          (item) => modelNumbers.includes(item.model_number)
        );
    }

    // TODO: Is this the same method as above? - Artem
    /**
     * Gets a list of items matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of objects corresponding to the given model
     */
    getByModelNumbers(modelNumbers) {
        let allItems = this.getAll();
        if (allItems != null) {
        let results = allItems.filter(
          (item) => modelNumbers.includes(item.model_number)
        );
        return results;
        } else return [];
    }

    /**
     * Adds new objects into the identity map
     * @param {Object[]} newInventoryItems a list containing new items
     */
    add(newInventoryItems) {
        this.InventoryItems.push(newInventoryItems);
    }

    /**
     * Deletes items from the identity map by filtering them out
     * @param {string[]} inventoryItemsToRemove a list of alpha-numberical
     * model numbers for which the items are to be removed
     */
    delete(inventoryItemsToRemove) {
        // Keep only the items which are not marked for deletion
        this.InventoryItems = this.InventoryItems.filter(
          (item) => !inventoryItemsToRemove.includes(item.model_number)
        );
    }
}
module.exports = InventoryItemsIdentityMap;
