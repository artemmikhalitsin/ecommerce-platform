/**
 * Class containing info common to all products
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
class ProductDescription {
    /**
     * Given info common to all products, creates an object
     * @param {Object} productInfo an object containing the specification of
     * the product
     */
    constructor(productInfo) {
        this.price = productInfo.price;
        this.weight = productInfo.weight;
        this.brandName = productInfo.brandName;
        this.modelNumber = productInfo.modelNumber;
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

module.exports = ProductDescription;
