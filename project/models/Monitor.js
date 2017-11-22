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
          this.display_size,
          this.price,
          this.weight,
          this.brand_name,
          this.model_number,
          this.type);
    }
}

module.exports = Monitor;
