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

     // TODO modify to only retrieve available descriptions
  getAll() {
    return this.productDescriptions;
  }

  /**
     * Gets a list of products matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of products corresponding to the given model
     * numbers
     */
  get(modelNumbers) {
    return this.productDescriptions.filter((item) => {
      return modelNumbers.includes(item.model_number);
    });
  }

  /**
     * Adds new objects into the identity map
     * @param {Object[]} newProductDescriptions a list containing new products
     */
  add(newProductDescriptions) {
    for (let i = 0; i < newProductDescriptions.length; i++) {
      let item = newProductDescriptions[i];
      if (!this.productDescriptions.includes(item.model_number)) {
        this.productDescriptions.push(
          // Push a copy of the object
          Object.assign({}, newProductDescriptions[i])
        );
      }
    }
  }

  /**
   * Updates a single item in the identity map
   * @param updatedProductDescriptions list of objects, each specifying new
   * descriptions of products
   */
  update(updatedProductDescriptions) {
    for (let i = 0; i< updatedProductDescriptions.length; i++) {
      let newDescription = updatedProductDescriptions[i];
      let index = this.productDescriptions.findIndex(
        (product) => {
          // Get the index of the model_number
          return product.model_number == newDescription.model_number;
        }
      );

      // If model number exists in the map, replace the description with
      // a copy of the new one
      if (index > -1) {
        this.productDescriptions[index] = Object.assign({}, newDescription);
      }
    }
  }
  /**
     * Deletes items from the identity map by filtering them out
     * @param {string[]} productDescriptionToRemove a list of alpha-numberical
     * model numbers for which the description is to be removed
     */
  delete(toRemove) {
    this.productDescription = this.productDescription.filter((item) => {
      return !toRemove.includes(item.model_number);
    });
  }
}
module.exports = ProductDescriptionsIdentityMap;
