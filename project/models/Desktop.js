const rootPath = require('app-root-dir').get();
const Dimensions = require(rootPath + 'models/Dimensions.js');
const Computer = require(rootPath + 'models/Computer.js');


/**
 * Class representing a Desktop
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
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
   */
  constructor(computerInfo, dimensionsInfo, productInfo) {
        super(computerInfo, productInfo);
        this.dimensions = new Dimensions(dimensionsInfo);
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
