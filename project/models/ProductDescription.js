/**
 * Class containing info common to all products
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
class ProductDescription {
    /*
     * Given info common to all products, creates an object
     * @param {string} price price
     * @param {string} weight weight
     * @param {string} brandName brand name
     * @param {string} modelNumber model number
     * @param {string} type
     * @param {boolean} isAvailable
     */
    constructor(price, weight, brandName, modelNumber, type, isAvailable) {
        this._price = price;
        this._weight = weight;
        this._brandName = brandName;
        this._modelNumber = modelNumber;
        this._isAvailable = isAvailable;
        this._type = type;
    }
    /**
     * type accessor
     * @return {string} the type of the object
     */
     get type() {
       return this._type;
     }
     /**
      * type mutator. object's type should not be changed as it is determined
      * during construction, so this method does nothing.
      * @param {string} type ignored
      */
      set type(type) {/* an object's type shouldn't be changed */}
    /**
     * price accessor
     * @return {number} price of the product
     */
    get price() {
      return this._price;
    }
    /**
    * price mutator
    * @param {number} price the new price of the product
    */
    set price(price) {
      this._price = price;
    }
    /**
     * weight accessor
     * @return {number} weight of the product
     */
    get weight() {
       return this._weight;
    }
    /**
    * weight mutator
    * @param {number} weight the new weight of the product
    */
    set weight(weight) {
      this._weight = weight;
    }
    /**
     * brandName accesoor
     * @return {string} brand name
     */
    get brandName() {
      return this._brandName;
    }
    /**
    * brandName mutator
    * @param {string} brandName the new brand name of the product
    */
    set brandName(brandName) {
      this._brandName = brandName;
    }
    /**
     * model number accessor
     * @return {string} the alphanumeric model number of the product
     */
    get modelNumber() {
      return this._modelNumber;
    }
    /**
    * modelNumber mutator
    * @param {string} modelNumber the new model number of the product
    */
    set modelNumber(modelNumber) {
      this._modelNumber = modelNumber;
    }
    /**
     * isAvailable accessor
     * @return {boolean} availability of the product
     */
    get isAvailable() {
      return this._isAvailable;
    }
    /**
     * isAvailable mutator
     * @param {boolean} isAvailable new availability status of the product
     */
     set isAvailable(isAvailable) {
       this._isAvailable = isAvailable;
     }
}

module.exports = ProductDescription;
