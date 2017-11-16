const rootPath = require('app-root-dir').get();
// REVIEW: UnitOfWork is never used here, consider removing - Artem
// const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
//Singleton
let _instance;

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

    this.productDesc = [];

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
    let result = this.productDesc;
    return result;

  }

  // TODO: Is this the same method as above? - Artem
  /**
     * Gets a list of products matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of products corresponding to the given model
     * numbers
     */
  get(modelNumbers) {
    return this.productDesc.filter((productDesc) => {
      return modelNumbers.includes(productDesc.model_number)
    })
  }

  /**
     * Adds new objects into the identity map
     * @param {Object[]} newProductDescriptions a list containing new products
     */
  add(newProductDescriptions) {
    // If list contains no items, do no computation
    if (newProductDescriptions.length > 0) {
      // Extract model numbers of each product
      let existingModelNumbers = this.productDesc.map((product) => product.model_number);
      for (let i = 0; i < newProductDescriptions.length; i++) {
        let productToAdd = newProductDescriptions[i];
        // Add only if item isn't already in the known model numbers
        if (!existingModelNumbers.includes(productToAdd.model_number)) {
          this.productDesc.push(productToAdd);
        }
      }
    }
  }
  /**
     * Modifies items from the identity map by filtering them out
     * @param {string[]} productDescriptionsToUpdate a list of alpha-numberical
     * model numbers, for which the products are to be updated
     */
     //TODO
  update(updatedProductDescription) {
    if (updatedProductDescription/length >0){
      // Extract model numbers of each product
      let existingModelNumbers = this.productDesc.map((product) => product.model_number);
      for (let i = 0; i < updatedProductDescription.length; i++) {
        let productToUpdate = updatedProductDescription[i];
        // Verify the right description gets updated
        if (existingModelNumbers==productToUpdate.model_number) {
          this.productDesc = updatedProductDescription[i];
        }
      }

    }
  }
}
module.exports = ProductDescriptionsIdentityMap;
