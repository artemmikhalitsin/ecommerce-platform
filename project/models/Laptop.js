/**
 * Class representing a Laptop
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
const rootPath = require('app-root-dir').get();
const Computer = require(rootPath + '/models/Computer.js');

class Laptop extends Computer {
    /**
     * Given attributes of a laptop, constructs a new object
     * @param {Object} computerId id of the computer
     * @param {string} processorType processor type
     * @param {number} ramSize size of ram
     * @param {number} numberCpuCores number of cores
     * @param {string} harddriveSize size of hard drive
     * @param {number} displaySize size of the display
     * @param {string} batteryInfo info about the batteryInfo
     * @param {string} os type of os
     * @param {boolean} touchscreen whether the laptop has a touchscreen
     * @param {boolean} camera whether the laptop has a camera
     * @param {string} price price
     * @param {string} weight weight
     * @param {string} brandName brand name
     * @param {string} modelNumber model number
     */
    constructor(computerId, processorType, ramSize, numberCpuCores, harddriveSize,
                displaySize, batteryInfo, os, touchscreen, camera, price,
                weight, brandName, modelNumber) {
        super(processorType, ramSize, numberCpuCores, harddriveSize, price,
              weight, brandName, modelNumber);
        this.computerId = computerId;
        this.displaySize = displaySize;
        this.batteryInfo = batteryInfo;
        this.os = os;
        this.touchscreen = touchscreen;
        this.camera = camera;
    }

    /**
     * displaySize accessor
     * @return {number} size of the display
     */
    getDisplaySize() {
      return this.displaySize;
    }
    /**
     * touchscreen accessor
     * @return {boolean} true if laptop has a touschreen, otherwise false
     */
    getTouchscreen() {
       return this.touchscreen;
    }
    /**
    * camera accessor
    * @return {boolean} true if laptop has a camera, otherwise false
    */
    getCamera() {
      return this.camera;
    }
    /**
     * batteryInfo accessor
     * @return {string} battery info
     */
    getBatteryInfo() {
      return this.batteryInfo;
    }
    /**
     * os accessor
     * @return {string} type of os
     */
    getOs() {
      return this.os;
    }
    /**
     * displaySize mutator
     * @param {number} displaySize new size of the display
     */
    setDisplaySize(displaySize) {
      this.displaySize = displaySize;
    }
    /**
     * touchscreen mutator
     * @param {boolean} touchscreen new value for touchscreen
     */
    setTouchscreen(touchscreen) {
      this.touchscreen = touchscreen;
    }
    /**
     * camera mutator
     * @param {boolean} camera new value for camera
     */
    setCamera(camera) {
      this.camera = camera;
    }
    /**
     * batteryInfo mutator
     * @param {string} batteryInfo new info about the battery
     */
    setBatteryInfo(batteryInfo) {
      this.batteryInfo = batteryInfo;
    }
    /**
     * os mutator
     * @param {string} os new type of os
     */
    setOs(os) {
      this.os = os;
    }
}

module.exports = Laptop;
