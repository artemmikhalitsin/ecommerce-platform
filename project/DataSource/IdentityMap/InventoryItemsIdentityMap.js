'use strict';
/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
// Singleton class
let _instance;

class InventoryItemsIdentityMap {
  /**
     * Creates an inventory item identity map
     */
  constructor() {
    this.inventoryItems = [];
  }

  static instance() {
    if (!_instance) {
      _instance = new InventoryItemsIdentityMap();
    }
    return _instance;
  }

  /**
     * Gets all the items currently stored in the Identity map
     * @return {Object[]} an array containing the items
     */
  getAll() {
    return this.inventoryItems;
  }

  /**
     * Gets a list of items matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of items corresponding to the given model
     * numbers
     */
  get(modelNumbers) {
    // Filters to only items whos model number appears in the given list
    return this.inventoryItems.filter((item) => {
      return modelNumbers.includes(item.serial_number);
    });
  }

  /**
     * Adds new objects into the identity map
     * @param {Object[]} newInventoryItems a list containing new items
     */
  add(newInventoryItems) {
    for (let i = 0; i < newInventoryItems.length; i++) {
      let item = newInventoryItems[i];
      // Add the item only if it doesn't already exist
      if (!this.inventoryItems.includes(item.serial_number)) {
        this.inventoryItems.push(
          Object.assign({}, newInventoryItems[i])
        );
      }
    }
  }

  /**
     * Deletes items from the identity map by filtering them out
     * @param {string[]} inventoryItemsToRemove a list of alpha-numberical
     * model numbers for which the items are to be removed
     */
  delete(toRemove) {
    this.inventoryItems = this.inventoryItems.filter((item) => {
      return !toRemove.includes(item.serial_number);
    });
  }
}
module.exports = InventoryItemsIdentityMap;
