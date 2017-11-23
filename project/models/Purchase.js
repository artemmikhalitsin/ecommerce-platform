/**
 * Class containing info common to all Purchases
 * @author
 */
class Purchase {
    /**
     * @param {number} purchaseId id
     * @param {string} serialNumber brand name
     * @param {string} modelNumber model number
     */
    constructor(purchaseId, serialNumber, modelNumber) {
        this._purchaseId = purchaseId;
        this._serialNumber = serialNumber;
        this._modelNumber = modelNumber;
    }

  /**
     * id accessor
     * @return {number} the id of the object
     */
  get purchaseId() {
      return this._purchaseId;
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

  clone() {
    return new Purchase(
      this.purchaseId,
      this.serialNumber,
      this.modelNumber
    );
  }
}

module.exports = Purchase;
