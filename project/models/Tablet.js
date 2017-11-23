/**
 * Class representing a Tablet
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 * @author Artem Mikhalitsin
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
     * @param {string} type
     */
     // REVIEW: constructor should not accept type - it should set
     // the product type to 'Tablet' itself - Artem
    constructor(computerId, processorType, ramSize, numberCpuCores,
                harddriveSize, displaySize, dimensions, batteryInfo, os,
                cameraInfo, price, weight, brandName, modelNumber, type,
                isAvailable) {
        super(computerId, processorType, ramSize, numberCpuCores, harddriveSize,
              price, weight, brandName, modelNumber, type, isAvailable);
        this._displaySize = displaySize;
        this._dimensions = dimensions;
        this._batteryInfo = batteryInfo;
        this._os = os;
        this._cameraInfo = cameraInfo;
    }
    /**
     * displaySize accessor
     * @return {number} size of the display
     */
    get displaySize() {
      return this._displaySize;
    }
    /**
    * displaySize mutator
    * @param {number} displaySize new size of the display
    */
    set displaySize(displaySize) {
      this._displaySize = displaySize;
    }
    /**
     * dimensions accessor
     * @return {Object} dimensions of the desktop
     */
    get dimensions() {
      return this._dimensions.clone();
    }
    /**
    * dimensions mutator
    * @param {Object} dimensions new dimensions of the desktop
    */
    set dimensions(dimensions) {
      this._dimensions = dimensions.clone();
    }
    /**
     * batteryInfo accessor
     * @return {string} battery info
     */
    get batteryInfo() {
      return this._batteryInfo;
    }
    /**
    * batteryInfo mutator
    * @param {string} batteryInfo new info about the battery
    */
    set batteryInfo(batteryInfo) {
      this._batteryInfo = batteryInfo;
    }
    /**
     * os accessor
     * @return {string} type of os
     */
    get os() {
      return this._os;
    }
    /**
    * os mutator
    * @param {string} os new type of os
    */
    set os(os) {
      this._os = os;
    }
    /**
     * cameraInfo accessor
     * @return {string} info about the camera
     */
    get cameraInfo() {
      return this._cameraInfo;
    }
    /**
     * cameraInfo mutator
     * @param {string} cameraInfo new info about the camera
     */
    set cameraInfo(cameraInfo) {
      this._cameraInfo = cameraInfo;
    }
    /**
     * Creates a clone of the object
     * @return {Tablet} a clone of the object
     */
    clone() {
      return new Tablet(
          this.compId,
          this.processorType,
          this.ramSize,
          this.numberCpuCores,
          this.harddriveSize,
          this.displaySize,
          this.dimensions,
          this.batteryInfo,
          this.os,
          this.cameraInfo,
          this.price,
          this.weight,
          this.brandName,
          this.modelNumber,
          this.type,
          this.isAvailable);
    }
    frontendFriendlify() {
      return {
        // Product properties
        type: this.type,
        modelNumber: this.modelNumber,
        brandName: this.brandName,
        price: this.price,
        weight: this.weight,
        // Computer properties
        processorType: this.processorType,
        ramSize: this.ramSize,
        numberCpuCores: this.numberCpuCores,
        harddriveSize: this.harddriveSize,
        // Tablet properties
        os: this.os,
        cameraInfo: this.cameraInfo,
        displaySize: this.displaySize,
        batteryInfo: this.batteryInfo,
        dimensions: {
          height: this.dimensions.height,
          width: this.dimensions.width,
          depth: this.dimensions.depth,
        },
      };
    }
}

module.exports = Tablet;
