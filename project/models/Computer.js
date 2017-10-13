class Computer extends ProductDescription {
    constructor(processorType, ramSize, numberCpuCores,
                harddriveSize, price, weight, brandName, modelNumber) {
      super(price, weight, brandName, modelNumber);
      this.processorType = processorType;
      this.ramSize = ramSize;
      this.numberCpuCores = numberCpuCores;
      this.harddriveSize = harddriveSize;
    }
    getProcessorType() {
      return this.processorType;
    }
    getRamSize() {
       return this.ramSize;
    }
    getNumberCpuCores() {
      return this.numberCpuCores;
    }
    getHarddriveSize() {
      return this.harddriveSize;
    }
    setProcessorType(processorType) {
      this.processorType = processorType;
    }
    setRamSize(ramSize) {
      this.ramSize = ramSize;
    }
    setNumberCpuCores(numberCpuCores) {
      this.numberCpuCores = numberCpuCores;
    }
    setHarddriveSize(harddriveSize) {
      this.harddriveSize = harddriveSize;
    }
}

module.exports = Computer;
