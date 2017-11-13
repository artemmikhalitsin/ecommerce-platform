/**
 * Class representing a computer
 * @extends {ProductDescription}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
class Computer extends ProductDescription {
    /**
     * Given attributes of a computer, consutrcts a Computer object
     * @param {string} processorType processor type
     * @param {number} ramSize size of ram
     * @param {number} numberCpuCores number of cores
     * @param {string} harddriveSize size of hard drive
     * @param {string} price price
     * @param {string} weight weight
     * @param {string} brandName brand name
     * @param {string} modelNumber model number
     */
    constructor(computerInfo, productInfo) {
      super(productInfo);
      this.processorType = computerInfo.processorType;
      this.ramSize = computerInfo.ramSize;
      this.numberCpuCores = computerInfo.numberCpuCores;
      this.harddriveSize = computerInfo.harddriveSize;
    }
    /**
     * processorType accessor
     * @return {string} proccessor type
     */
    getProcessorType() {
      return this.processorType;
    }
    /**
     * ramSize accessor
     * @return {number} ram size
     */
    getRamSize() {
       return this.ramSize;
    }
    /**
     * numberCpuCores accessor
     * @return {number} number of cpu cores
     */
    getNumberCpuCores() {
      return this.numberCpuCores;
    }
    /**
     * harddriveSize accessor
     * @return {number} size of hard drive
     */
    getHarddriveSize() {
      return this.harddriveSize;
    }
    /**
     * processorType mutator
     * @param {string} processorType new processor type
     */
    setProcessorType(processorType) {
      this.processorType = processorType;
    }
    /**
     * ramSize mutator
     * @param {number} ramSize new size of ram
     */
    setRamSize(ramSize) {
      this.ramSize = ramSize;
    }
    /**
     * numberCpuCores mutator
     * @param {number} numberCpuCores new number of cores
     */
    setNumberCpuCores(numberCpuCores) {
      this.numberCpuCores = numberCpuCores;
    }
    /**
     * harddriveSize mutator
     * @param {number} harddriveSize new size of hard drive
     */
    setHarddriveSize(harddriveSize) {
      this.harddriveSize = harddriveSize;
    }
}

module.exports = Computer;
