const rootPath = require('app-root-dir').get();
/**
 * Identity map of product descriptions, implemented as a singleton
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * @author Artem Mikhalitsin
 * REVIEW: Please make sure the comments are correct - Artem
 */
let _instance;

class ProductDescriptionsIdentityMap {
    /**
     * Creates a product description identity map
     */
    constructor() {
        this.products = [];
    }

    static getInstance() {
      if(!_instance){
        _instance = new ProductDescriptionsIdentityMap;
        return _instance;
      }
      return _instance;
    }

    /**
     * Gets a products matching given model numbers form the map
     * @param {string} modelNumber the model number corresponding to the product
     * @return {Object} the object corresponding to the given model
     * numbers in the identity map, if exists
     */
    get(modelNumber) {
      return this.products.find(
        (element) => { return element.model_number == modelNumber }
      )
    }

    /**
     * Adds a new product into the identity map
     * @param {Object} newProductDescriptions a list containing new products
     */
    add(product) {
      this.products.push(product);
    }

    /**
     * Deletes items from the identity map by filtering them out
     * @param {string} modelNumber a list of alpha-numberical
     * model numbers, for which the products are to be removed
     */
    delete(modelNumber) {
      let index = this.products.findIndex(
        (element) => { return element.model_number == modelNumber }
      )

      if(index > -1) {
        this.products.splice(index, 1);
      }
    }
}

module.exports = ProductDescriptionsIdentityMap;
