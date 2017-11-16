/**
 * Class representing a Tablet
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
const rootPath = require('app-root-dir').get();
const Computer = require(rootPath + '/models/Computer.js');

class Tablet extends Computer {
    /**
     * Given attributes of a laptop, constructs a new object
     * @param {String} computerId
     * @param {string} processorType processor type
     * @param {number} ramSize size of ram
     * @param {number} numberCpuCores number of cores
     * @param {string} harddriveSize size of hard drive
     * @param {number} displaySize size of the display
     * @param {Object} dimensions dimensions of the tablet
     * @param {string} batteryInfo info about the batteryInfo
     * @param {string} os type of os
     * @param {string} cameraInfo whether the laptop has a camera
     * @param {string} price price
     * @param {string} weight weight
     * @param {string} brandName brand name
     * @param {string} modelNumber model number
     */
    constructor(computerId, processorType, ramSize, numberCpuCores, harddriveSize,
                displaySize, dimensions, batteryInfo, os, cameraInfo,
                price, weight, brandName, modelNumber, type) {
        super(computerId, processorType, ramSize, numberCpuCores, harddriveSize,
              price, weight, brandName, modelNumber, type);
        this.displaySize = displaySize;
        this.dimensions = dimensions;
        this.batteryInfo = batteryInfo;
        this.os = os;
        this.cameraInfo = cameraInfo;
    }
    /**
     * displaySize accessor
     * @return {number} size of the display
     */
    getDisplaySize() {
      return this.displaySize;
    }
    /**
     * dimensions accessor
     * @return {Object} dimensions of the desktop
     */
    getDimensions() {
      return this.dimensions;
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
     * cameraInfo accessor
     * @return {string} info about the camera
     */
    getCameraInfo() {
      return this.cameraInfo;
    }
    /**
     * displaySize mutator
     * @param {number} displaySize new size of the display
     */
    setDisplaySize(displaySize) {
      this.displaySize = displaySize;
    }
    /**
     * dimensions mutator
     * @param {Object} dimensions new dimensions of the desktop
     */
    setDimensions(dimensions) {
      this.dimensions = dimensions;
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
    /**
     * cameraInfo mutator
     * @param {string} cameraInfo new info about the camera
     */
    setCameraInfo(cameraInfo) {
      this.cameraInfo = cameraInfo;
    }
}

module.exports = Tablet;
