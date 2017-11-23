'use strict';
/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
// Singleton class
let _instance;

class PurchaseIdentityMap {
  /**
     * Creates an inventory item identity map
     */
  constructor() {
    this.purchaseItems = [];
  }

  static instance() {
    if (!_instance) {
      _instance = new PurchaseIdentityMap();
    }
    return _instance;
  }

  /**
     * Gets all the items currently stored in the Identity map
     * @return {Object[]} an array containing the items
     */
  getAll() {
    return this.purchaseItems;
  }

  /**
     * Gets a list of items matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of items corresponding to the given model
     * numbers
     */
  get(modelNumbers) {
    // Filters to only items whos model number appears in the given list
    return this.purchaseItems.filter((item) => {
      return modelNumbers.includes(item.serial_number);
    });
  }

  /**
     * Adds new objects into the identity map
     * @param {Object[]} newPurchasedItem a list containing new items
     */
  add(newPurchasedItem) {
    for (let i = 0; i < newPurchasedItem.length; i++) {
      let item = newPurchasedItem[i];
      // Add the item only if it doesn't already exist
      if (!this.purchaseItems.includes(item.serialNumber)) {
        this.purchaseItems.push(
         newPurchasedItem[i].clone()
       );
      }
    }
  }

  /**
     * Deletes items from the identity map by filtering them out
     * @param {string[]} toRemove a list of alpha-numberical
     * model numbers for which the items are to be removed
     */
  delete(toRemove) {
    let itemsToRemove = toRemove.map((item) => item.serialNumber);
    this.purchaseItems = this.purchaseItems.filter((item) => {
      return !(itemsToRemove.includes(item.serialNumber));
    });
  }
}
module.exports = PurchaseIdentityMap;
