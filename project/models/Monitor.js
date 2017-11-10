class Monitor extends ProductDescription {
    constructor(displaySize, touchescreen, price, weight,
                brandName, modelNumber) {
        super(price, weight, brandName, modelNumber);
        this.displaySize = displaySize;
        this.touchescreen = touchescreen;
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
