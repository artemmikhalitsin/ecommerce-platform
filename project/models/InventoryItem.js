/**
 * Class containing info common to all products
 * @author Ekaterina Ruhlin
 */
 const rootPath = require('app-root-dir').get();
const Computer = require(rootPath + '/models/ProductDescription.js');
class InventoryItem {
    /**
     * @param {number} id id
     * @param {string} serialNumber brand name
     * @param {string} modelNumber model number
     * @param {Object} productDescription productDescription
     */
    constructor(id, serialNumber, modelNumber, productDescription) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.modelNumber = modelNumber;
        this.productDescription = productDescription;
    }

    /**
     * price accessor
     * @return {number} price of the product
     */
    getPrice() {
      return this.price;
    }
    /**
     * weight accessor
     * @return {number} weight of the product
     */
    getWeight() {
       return this.weight;
    }
    /**
     * brandName accesoor
     * @return {string} brand name
     */
    getBrandName() {
      return this.brandName;
    }
    /**
     * model number accessor
     * @return {string} the alphanumeric model number of the product
     */
    getModelNumber() {
      return this.modelNumber;
    }

    /**
     * price mutator
     * @param {number} price the new price of the product
     */
    setPrice(price) {
      this.price = price;
    }
    /**
     * weight mutator
     * @param {number} weight the new weight of the product
     */
    setWeight(weight) {
      this.weight = weight;
    }
    /**
     * brandName mutator
     * @param {string} brandName the new brand name of the product
     */
    setBrandName(brandName) {
      this.brandName = brandName;
    }
    /**
     * modelNumber mutator
     * @param {string} modelNumber the new model number of the product
     */
    setModelNumber(modelNumber) {
      this.modelNumber = modelNumber;
    }
}

module.exports = InventoryItem;
