'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a Desktop
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
var rootPath = require('app-root-dir').get();
var Computer = require(rootPath + '/models/Computer.js');

var Desktop = function (_Computer) {
  _inherits(Desktop, _Computer);

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
  function Desktop(processorType, ramSize, numberCpuCores, harddriveSize, dimensions, price, weight, brandName, modelNumber, computerId) {
    _classCallCheck(this, Desktop);

    var _this = _possibleConstructorReturn(this, (Desktop.__proto__ || Object.getPrototypeOf(Desktop)).call(this, computerId, processorType, ramSize, numberCpuCores, harddriveSize, price, weight, brandName, modelNumber));

    _this.dimensions = dimensions;
    return _this;
  }
  /**
   * dimensions accessor
   * @return {Object} dimensions of the desktop
   */


  _createClass(Desktop, [{
    key: 'getDimensions',
    value: function getDimensions() {
      return this.dimensions;
    }
    /**
     * dimensions mutator
     * @param {Object} dimensions new dimensions of the desktop
     */

  }, {
    key: 'setDimensions',
    value: function setDimensions(dimensions) {
      this.dimensions = dimensions;
    }
  }]);

  return Desktop;
}(Computer);

module.exports = Desktop;