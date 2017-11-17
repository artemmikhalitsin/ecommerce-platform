'use strict';
/**
 * Identity map of product descriptions
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
//Singleton CLASS
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
    return this.productDescriptions;
  }

  // TODO: Is this the same method as above? - Artem
  /**
     * Gets a list of products matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of products corresponding to the given model
     * numbers
     */
  get(modelNumbers) {
    return this.productDescriptions.filter((item) => {
      return modelNumbers.includes(item.model_number)
    });
  }

  /**
     * Adds new objects into the identity map
     * @param {Object[]} newProductDescriptions a list containing new products
     */
  add(newProductDescriptions) {
    for (var i = 0; i < newProductDescriptions.length; i++) {
      let item = newProductDescriptions[i];
      if (!this.productDescriptions.includes(item.model_number)) {
        this.productDescriptions.push(newProductDescriptions[i]);
      }
    }
  }

  update(updatedProductDescription) {
    for (var i = 0; i < updatedProductDescription.length; i++) {
      let item = updatedProductDescription[i];
      if (this.productDescriptions.includes(item.model_number)) {
        for (var j = 0; j < this.productDescriptions.length; j++) {
          let updateItem = this.productDescriptions[j];
          if (upadateItem.model_number == item.model_number) {
            this.productDescriptions[j] = item;
          }
        }
      } else {
        this.productDescriptions.push(newProductDescriptions[i]);
      }
    }
  }
}
module.exports = ProductDescriptionsIdentityMap;
