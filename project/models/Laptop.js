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
     * @param {string} type
     */
    constructor(computerId, processorType, ramSize, numberCpuCores,
                harddriveSize, displaySize, batteryInfo, os, touchscreen,
                camera, price, weight, brandName, modelNumber, type) {
        super(computerId, processorType, ramSize, numberCpuCores, harddriveSize,
          price, weight, brandName, modelNumber, type);
        this._displaySize = displaySize;
        this._batteryInfo = batteryInfo;
        this._os = os;
        this._touchscreen = touchscreen;
        this._camera = camera;
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
     * touchscreen accessor
     * @return {boolean} true if laptop has a touschreen, otherwise false
     */
    get touchscreen() {
       return this._touchscreen;
    }
    /**
    * touchscreen mutator
    * @param {boolean} touchscreen new value for touchscreen
    */
    set touchscreen(touchscreen) {
      this._touchscreen = touchscreen;
    }
    /**
    * camera accessor
    * @return {boolean} true if laptop has a camera, otherwise false
    */
    get camera() {
      return this._camera;
    }
    /**
    * camera mutator
    * @param {boolean} camera new value for camera
    */
    set camera(camera) {
      this._camera = camera;
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
     * Creates a conse of the object
     * @return {Laptop} a copy of the object
     */
    clone() {
      return new Laptop(
          this.comp_id,
          this.processor_type,
          this.ram_size,
          this.number_cpu_cores,
          this.harddrive_size,
          this.display_size,
          this.battery_info,
          this.os,
          this.touch_screen,
          this.camera,
          this.price,
          this.weight,
          this.brand_name,
          this.model_number,
          this.type);
    }
}

module.exports = Laptop;
