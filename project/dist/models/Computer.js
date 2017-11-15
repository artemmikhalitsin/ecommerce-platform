"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a computer
 * @extends {ProductDescription}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
var Computer = function (_ProductDescription) {
  _inherits(Computer, _ProductDescription);

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
  function Computer(processorType, ramSize, numberCpuCores, harddriveSize, price, weight, brandName, modelNumber) {
    _classCallCheck(this, Computer);

    var _this = _possibleConstructorReturn(this, (Computer.__proto__ || Object.getPrototypeOf(Computer)).call(this, price, weight, brandName, modelNumber));

    _this.processorType = processorType;
    _this.ramSize = ramSize;
    _this.numberCpuCores = numberCpuCores;
    _this.harddriveSize = harddriveSize;
    return _this;
  }
  /**
   * processorType accessor
   * @return {string} proccessor type
   */


  _createClass(Computer, [{
    key: "getProcessorType",
    value: function getProcessorType() {
      return this.processorType;
    }
    /**
     * ramSize accessor
     * @return {number} ram size
     */

  }, {
    key: "getRamSize",
    value: function getRamSize() {
      return this.ramSize;
    }
    /**
     * numberCpuCores accessor
     * @return {number} number of cpu cores
     */

  }, {
    key: "getNumberCpuCores",
    value: function getNumberCpuCores() {
      return this.numberCpuCores;
    }
    /**
     * harddriveSize accessor
     * @return {number} size of hard drive
     */

  }, {
    key: "getHarddriveSize",
    value: function getHarddriveSize() {
      return this.harddriveSize;
    }
    /**
     * processorType mutator
     * @param {string} processorType new processor type
     */

  }, {
    key: "setProcessorType",
    value: function setProcessorType(processorType) {
      this.processorType = processorType;
    }
    /**
     * ramSize mutator
     * @param {number} ramSize new size of ram
     */

  }, {
    key: "setRamSize",
    value: function setRamSize(ramSize) {
      this.ramSize = ramSize;
    }
    /**
     * numberCpuCores mutator
     * @param {number} numberCpuCores new number of cores
     */

  }, {
    key: "setNumberCpuCores",
    value: function setNumberCpuCores(numberCpuCores) {
      this.numberCpuCores = numberCpuCores;
    }
    /**
     * harddriveSize mutator
     * @param {number} harddriveSize new size of hard drive
     */

  }, {
    key: "setHarddriveSize",
    value: function setHarddriveSize(harddriveSize) {
      this.harddriveSize = harddriveSize;
    }
  }]);

  return Computer;
}(ProductDescription);

module.exports = Computer;