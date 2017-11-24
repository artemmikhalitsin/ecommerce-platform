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
     * @return {InventoryItem[]} an array containing the items
     */
  getAll() {
    // Returns a copy of the array, so internal array can't be manipulated
    return Array.from(this.inventoryItems);
  }

  /**
     * Gets an item matching given serial number
     * @param {string} serialNumber an alpha-numberical serial number
     * @return {InventoryItem} the item corresponding to the given serial
     */
  get(serialNumber) {
    return this.inventoryItems.find(
      (item) => {
        return item.serialNumber === serialNumber;
      });
  }
  /**
   * Gets a list of items corresponding to a model number
   * @param {string} modelNumber an alpha-numerical model number
   * @return {InventoryItem[]} the items corresponding to the serial number
   */
  getByModelNumber(modelNumber) {
    return this.inventoryItems.filter(
      (item) => item.modelNumber === modelNumber
    );
  }

  update(updatedItem) {
    let index = this.inventoryItems.findIndex((item) => {
      return item.serialNumber === updatedItem.serialNumber;
    });
    // Update the identity map with a reference to the new description
    this.inventoryItems[index] = updatedItem;
  }

  /**
     * Adds a new object into the identity map
     * @param {InventoryItem} newInventoryItem an inventory item
     */
  add(newInventoryItem) {
        this.inventoryItems.push(newInventoryItem);
  }

  /**
     * Deletes an item from the identity map
     * @param {string} toRemove an alpha-numeric serial number
     * corresponding to the item
     */
   delete(toRemove) {
     let index = this.inventoryItems.findIndex(
       (elem) => elem.modelNumber === toRemove);
     if (index > -1) {
       this.inventoryItems.splice(index, 1);
     }
   }
}
module.exports = InventoryItemsIdentityMap;
