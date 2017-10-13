class Desktop extends Computer {
  constructor(processorType, ramSize, numberCpuCores, harddriveSize,
              dimensions, price, weight, brandName, modelNumber) {
    super(processorType, ramSize, numberCpuCores, harddriveSize,
          price, weight, brandName, modelNumber);
        this.dimensions = dimensions;
    }
    getDimensions() {
      return this.dimensions;
    }
    setDimensions(dimensions) {
      this.dimensions = dimensions;
    }
}

module.exports = Desktop;
