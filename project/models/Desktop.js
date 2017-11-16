/**
 * Class representing a Desktop
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
const rootPath = require('app-root-dir').get();
const Computer = require(rootPath + '/models/Computer.js');

class Desktop extends Computer {
  /**
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
   */
  constructor(processorType, ramSize, numberCpuCores, harddriveSize,
              dimensions, price, weight, brandName, modelNumber, computerId, type) {
    super(computerId, processorType, ramSize, numberCpuCores, harddriveSize,
          price, weight, brandName, modelNumber, type);
        this.dimensions = dimensions;
    }
    /**
     * dimensions accessor
     * @return {Object} dimensions of the desktop
     */
    getDimensions() {
      return this.dimensions;
    }
    /**
     * dimensions mutator
     * @param {Object} dimensions new dimensions of the desktop
     */
    setDimensions(dimensions) {
      this.dimensions = dimensions;
    }
}

module.exports = Desktop;
