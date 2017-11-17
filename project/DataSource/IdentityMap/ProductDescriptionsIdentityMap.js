<<<<<<< HEAD
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
}
module.exports = ProductDescriptionsIdentityMap;
=======
'use strict';
const rootPath = require('app-root-dir').get();
// REVIEW: UnitOfWork is never used here, consider removing - Artem
// const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const ProductDescriptionsTDG = require(rootPath +
   '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');


/**
 * Identity map of product descriptions
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */

class ProductDescriptionsIdentityMap {
    /**
     * Creates an product description identity map
     * Loads all product descriptions from database into memory
     */
    constructor() {
        this.productDescTDG = new ProductDescriptionsTDG();
        this.productDesc = [];

        let context = this.productDescTDG.getAll();
        Promise.all([context])
        .then((values) => {
          this.productDesc = values[0];
        });
    }

    /**
     * Gets all the products currently stored in the Identity map
     * @return {Object[]} an array containing the products
     */
    getAll() {
        let result = this.productDesc;
        if (this.productDesc.length > 0) {
            return result;
        } else {
            let productsFromTDG = this.productDescTDG.getAll();
            Promise.all([productsFromTDG])
            .then((values) => {
              result = values[0];
            });
            return result;
        }
    }

    // TODO: Is this the same method as above? - Artem
    /**
     * Gets a list of products matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of products corresponding to the given model
     * numbers
     */
    get(modelNumbers) {
        let allProducts = this.getAll();
        if (allProducts != null) {
          let results = allProducts.filter(
            (desc) => modelNumbers.includes(desc.modelNumber)
          );
          return results;
        } else return [];
    }

    /**
     * Adds new objects into the identity map
     * @param {Object[]} newProductDescriptions a list containing new products
     */
    add(newProductDescriptions) {
        // If list contains no items, do no computation
        if (newProductDescriptions.length > 0) {
          // Extract model numbers of each product
          let existingModelNumbers = this.productDesc.map(
            (product) => product.modelNumber
          );
          for (let i = 0; i < newProductDescriptions.length; i++) {
              let productToAdd = newProductDescriptions[i];
              // Add only if item isn't already in the known model numbers
              if (!existingModelNumbers.includes(productToAdd.modelNumber)) {
                this.productDesc.push(productToAdd);
              }
          }
        }
    }
    /**
     * Deletes items from the identity map by filtering them out
     * @param {string[]} productDescriptionsToRemove a list of alpha-numberical
     * model numbers, for which the products are to be removed
     */
    delete(productDescriptionsToRemove) {
        this.productDesc = this.productDesc.filter(
          (desc) => !productDescriptionsToRemove.includes(desc.modelNumber)
      );
    }
}
module.exports = ProductDescriptionsIdentityMap;
>>>>>>> 8c6de9439be15fed271328a4c7a3b60440f36048
