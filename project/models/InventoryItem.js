/**
 * Class containing info common to all products
 * @author Ekaterina Ruhlin
 * @author Artem Mikhalitsin
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
    * serialNumber accessor
    * @return {string} serial number of the item
    */
  get serialNumber() {
    return this._serialNumber;
  }
  /**
  * serialNumber mutator
  * @param {string} serialNumber the new serial number of the item
  */
  set serialNumber(serialNumber) {
    this._serialNumber = serialNumber;
  }
  /**
   * modelNumber accessor
   * @return {string} model number of the item
   */
  get modelNumber() {
    return this._modelNumber;
  }
  /**
  * modelNumber mutator
  * @param {string} modelNumber new model number of the item
  */
  set modelNumber(modelNumber) {
    this._modelNumber = modelNumber;
  }
  /**
   * productDescription accessor (returns a reference to the object)
   */
  get productDescription() {
    return this._productDescription;
  }
  /**
   * productDescription mutator
   * @param {Object} productDescription reference to the new description
   */
   set productDescription(productDescription) {
     this_.productDescription = productDescription;
   }
  clone() {
    return new InventoryItem(
      this.id,
      this.serialNumber,
      this.modelNumber,
      this.productDescription
    );
  }
}

module.exports = InventoryItem;
