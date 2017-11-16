const rootPath = require('app-root-dir').get();
const ProductDescription = require(rootPath + '/models/ProductDescription.js');

class Monitor extends ProductDescription {
    constructor(displaySize, price, weight,
                brandName, modelNumber) {
        super(price, weight, brandName, modelNumber);
        this.displaySize = displaySize;
    }
    getDisplaySize() {
      return this.displaySize;
    }
    getTouchescreen() {
       return this.touchescreen;
    }


    setDisplaySize(displaySize) {
      this.displaySize = displaySize;
    }
    setTouchescreen(touchescreen) {
      this.touchescreen = touchescreen;
    }
}

module.exports = Monitor;
