/**
 * Class representing a computer
 * @extends {ProductDescription}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
const rootPath = require('app-root-dir').get();
const ProductDescription = require(rootPath + '/models/ProductDescription.js');

class Computer extends ProductDescription {
    /*
     * Given attributes of a computer, consutrcts a Computer object
     * @param {String} id id
     * @param {string} processorType processor type
     * @param {number} ramSize size of ram
     * @param {number} numberCpuCores number of cores
     * @param {string} harddriveSize size of hard drive
     * @param {string} price price
     * @param {string} weight weight
     * @param {string} brandName brand name
     * @param {string} modelNumber model number
     * @param {string} type
     */
    constructor(id, processorType, ramSize, numberCpuCores,
                harddriveSize, price, weight, brandName, modelNumber, type,
                isAvailable) {
      super(price, weight, brandName, modelNumber, type, isAvailable);
      this._computerId = id;
      this._processorType = processorType;
      this._ramSize = ramSize;
      this._numberCpuCores = numberCpuCores;
      this._harddriveSize = harddriveSize;
    }
    /**
     * computerId accessor
     * @return {number} id of the computer
     */
     get compId() {
       return this._computerId;
     }
     /**
      * computerId mutator. Ids are immutable, so this method does nothing
      * and exists only for interfacing purposes
      * @param {number} compId ignored
      */
    set compId(compId) {/* ids are immutable */}
    /**
     * processorType accessor
     * @return {string} proccessor type
     */
    get proccesorType() {
      return this._processorType;
    }
    /**
    * processorType mutator
    * @param {string} processorType new processor type
    */
    set proccesorType(processorType) {
      this._processorType = processorType;
    }
    /**
     * ramSize accessor
     * @return {number} ram size
     */
    get ramSize() {
       return this._ramSize;
    }
    /**
    * ramSize mutator
    * @param {number} ramSize new size of ram
    */
    set ramSize(ramSize) {
      this._ramSize = ramSize;
    }
    /**
     * numberCpuCores accessor
     * @return {number} number of cpu cores
     */
    get numberCpuCores() {
      return this._numberCpuCores;
    }
    /**
    * numberCpuCores mutator
    * @param {number} numberCpuCores new number of cores
    */
    set numberCpuCores(numberCpuCores) {
      this._numberCpuCores = numberCpuCores;
    }
    /**
     * harddriveSize accessor
     * @return {number} size of hard drive
     */
    get harddriveSize() {
      return this._harddriveSize;
    }
    /**
     * harddriveSize mutator
     * @param {number} harddriveSize new size of hard drive
     */
    set harddriveSize(harddriveSize) {
      this._harddriveSize = harddriveSize;
    }
}

module.exports = Computer;
