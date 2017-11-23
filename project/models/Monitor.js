const rootPath = require('app-root-dir').get();
const ProductDescription = require(rootPath + '/models/ProductDescription.js');

class Monitor extends ProductDescription {
    constructor(displaySize, price, weight,
                brandName, modelNumber, type) {
        super(price, weight, brandName, modelNumber, type);
        this._displaySize = displaySize;
    }
    /**
     * display size accessor
     * @return {number} display size
     */
    get displaySize() {
      return this._displaySize;
    }
    /**
     * display size mutator
     * @param {number} displaySize new value of displaySize
     */
    set displaySize(displaySize) {
      this._displaySize = displaySize;
    }
    /**
     * Creates a clonse of the object
     * @return {Monitor} a copy of this object
     */
    clone() {
      return new Monitor(
          this.displaySize,
          this.price,
          this.weight,
          this.brandName,
          this.modelNumber,
          this.type);
    }
    frontendFriendlify() {
      return {
        // Product properties
        type: this.type,
        model_number: this.modelNumber,
        brand_name: this.brandName,
        price: this.price,
        weight: this.weight,
        // Monitor properties
        display_size: this.displaySize,
      };
    }
}

module.exports = Monitor;
