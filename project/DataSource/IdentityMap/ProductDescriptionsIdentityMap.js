'use strict';
/**
 * Identity map of product descriptions
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
// Singleton class
let _instance;

class ProductDescriptionsIdentityMap {
  /**
     * Creates an product description identity map
     * Loads all product descriptions from database into memory
     */
  constructor() {
    this.productDescriptions = [];
  }

  static instance() {
    if (!_instance) {
      _instance = new ProductDescriptionsIdentityMap();
    }
    return _instance;
  }

  /**
     * Gets all the products currently stored in the Identity map
     * @return {Object[]} an array containing the products
     */
  getAll() {
    // Returns a copy of the array, so internal array can't be manipulated
    return Array.from(this.productDescriptions);
  }

  /**
     * Gets a product from the identity map
     * @param {string} modelNumber and alpha-numerical model number
     * @return {Object} a product corresponding to the given model
     * numbers, if exists
     */
  get(modelNumber) {
    return this.productDescriptions.find((item) => {
      return item.modelNumber === modelNumber;
    });
  }

  /**
     * Adds a new object into the identity map
     * @param {Object[]} newProductDescription a list containing new products
     */
  add(newProductDescription) {
    this.productDescriptions.push(newProductDescription);
  }

  /**
     * Deletes an item from the identity map
     * @param {string[]} toRemove a model number corresponding to the
     * item which is to be deleted
     * model numbers for which the description is to be removed
     */
  delete(toRemove) {
    let index = this.productDescriptions.findIndex(
      (elem) => elem.modelNumber === toRemove);
    if (index > -1) {
      this.productDescriptions.splice(index, 1);
    }
  }
}
module.exports = ProductDescriptionsIdentityMap;
