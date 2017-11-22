/**
 * Class representing a Desktop
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
const rootPath = require('app-root-dir').get();
const Computer = require(rootPath + '/models/Computer.js');

class Desktop extends Computer {
  /*
   * Given attributes of a desktop, constructs a new object
   * @param {string} processorType processor type
   * @param {number} ramSize size of ram
   * @param {number} numberCpuCores number of cores
   * @param {string} harddriveSize size of hard drive
   * @param {Object} dimensions dimensions of the desktop
   * @param {string} price price
   * @param {string} weight weight
   * @param {string} brandName brand name
   * @param {string} modelNumber model number
   * @param {Object} computerId computer id
   * @param {string} type
   */
  constructor(processorType, ramSize, numberCpuCores, harddriveSize,
              dimensions, price, weight, brandName, modelNumber, computerId,
              type) {
    super(computerId, processorType, ramSize, numberCpuCores, harddriveSize,
          price, weight, brandName, modelNumber, type);
        this._dimensions = dimensions;
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
     * Creates a clone of the objects
     * @return {Desktop} a clone of the object
     */
    clone() {
      return new Desktop(
          this.processor_type,
          this.ram_size,
          this.number_cpu_cores,
          this.harddrive_size,
          this.dimensions,
          this.price,
          this.weight,
          this.brandName,
          this.modelNumber,
          this.comp_id,
          this.type);
    }
}

module.exports = Desktop;
