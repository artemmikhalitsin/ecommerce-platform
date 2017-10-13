class Laptop extends Computer {
    constructor(processorType, ramSize, numberCpuCores, harddriveSize,
                displaySize, batteryInfo, os, touchscreen, camera, price,
                weight, brandName, modelNumber) {
        super(processorType, ramSize, numberCpuCores, harddriveSize, price,
              weight, brandName, modelNumber);
        this.displaySize = displaySize;
        this.batteryInfo = batteryInfo;
        this.os = os;
        this.touchscreen = touchscreen;
        this.camera = camera;
    }

    getDisplaySize() {
      return this.displaySize;
    }
    getTouchscreen() {
       return this.touchscreen;
    }
    getBatteryInfo() {
      return this.batteryInfo;
    }
    getOs() {
      return this.os;
    }
    getCamera() {
      return this.camera;
    }
    setDisplaySize(displaySize) {
      this.displaySize = displaySize;
    }
    setTouchscreen(touchscreen) {
      this.touchscreen = touchscreen;
    }
    setBatteryInfo(batteryInfo) {
      this.batteryInfo = batteryInfo;
    }
    setOs(os) {
      this.os = os;
    }
    setCamera(camera) {
      this.camera = camera;
    }
}

module.exports = Laptop;
