/**
 * Class containing info common to all products
 * @author Ekaterina Ruhlin
 */
// const rootPath = require('app-root-dir').get();
// const Computer = require(rootPath + '/models/ProductDescription.js');
class InventoryItem {
  /**
   * @param {number} id id
   * @param {string} serialNumber brand name
   * @param {string} modelNumber model number
   * @param {Object} productDescription productDescription
   */
  constructor(id, serialNumber, modelNumber, productDescription) {
      this._id = id;
      this._serialNumber = serialNumber;
      this._modelNumber = modelNumber;
      this._productDescription = productDescription;
  }
  /**
   * id accessor
   * @return {number} the id of the object
   */
  get id() {
    return this._id;
  }
  /**
   * id mutator. id is immutable so this method does nothing and exists
   * only for interfacing purposes
   * @param {number} newId ignored
   */
  set id(newId) {/* id is immutable */};
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
    return this.brandName;
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
   * Creates a clone of the item
   * @return {InventoryItem} a clone ofhte item
   */
  clone() {
    return new InventoryItem(
      this.id,
      this.serialNumber,
      this.modelNumber,
      this.productDescription);
  }
}

module.exports = InventoryItem;
