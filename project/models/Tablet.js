class Tablet extends Computer {
    constructor(processorType, ramSize, numberCpuCores, harddriveSize,
                displaySize, dimensions, batteryInfo, os, cameraInfo,
                price, weight, brandName, modelNumber) {
        super(processorType, ramSize, numberCpuCores, harddriveSize,
              price, weight, brandName, modelNumber);
        this.displaySize = displaySize;
        this.dimensions = dimensions;
        this.batteryInfo = batteryInfo;
        this.os = os;
        this.cameraInfo = cameraInfo;
    }
    getDisplaySize() {
      return this.displaySize;
    }
    getDimensions() {
       return this.dimensions;
    }
    getBatteryInfo() {
      return this.batteryInfo;
    }
    getOs() {
      return this.os;
    }
    getCameraInfo() {
      return this.cameraInfo;
    }
    setDisplaySize(displaySize) {
      this.displaySize = displaySize;
    }
    setDimensions(dimensions) {
      this.dimensions = dimensions;
    }
    setBatteryInfo(batteryInfo) {
      this.batteryInfo = batteryInfo;
    }
    setOs(os) {
      this.os = os;
    }
    setCameraInfo(cameraInfo) {
      this.cameraInfo = cameraInfo;
    }
}

module.exports = Tablet;
