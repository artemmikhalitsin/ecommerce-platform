'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a Tablet
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
var rootPath = require('app-root-dir').get();
var Computer = require(rootPath + '/models/Computer.js');

var Tablet = function (_Computer) {
  _inherits(Tablet, _Computer);

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
   */
  function Tablet(computerId, processorType, ramSize, numberCpuCores, harddriveSize, displaySize, dimensions, batteryInfo, os, cameraInfo, price, weight, brandName, modelNumber) {
    _classCallCheck(this, Tablet);

    var _this = _possibleConstructorReturn(this, (Tablet.__proto__ || Object.getPrototypeOf(Tablet)).call(this, processorType, ramSize, numberCpuCores, harddriveSize, price, weight, brandName, modelNumber));

    _this.computerId = computerId;
    _this.displaySize = displaySize;
    _this.dimensions = dimensions;
    _this.batteryInfo = batteryInfo;
    _this.os = os;
    _this.cameraInfo = cameraInfo;
    return _this;
  }
  /**
   * displaySize accessor
   * @return {number} size of the display
   */


  _createClass(Tablet, [{
    key: 'getDisplaySize',
    value: function getDisplaySize() {
      return this.displaySize;
    }
    /**
     * dimensions accessor
     * @return {Object} dimensions of the desktop
     */

  }, {
    key: 'getDimensions',
    value: function getDimensions() {
      return this.dimensions;
    }
    /**
     * batteryInfo accessor
     * @return {string} battery info
     */

  }, {
    key: 'getBatteryInfo',
    value: function getBatteryInfo() {
      return this.batteryInfo;
    }
    /**
     * os accessor
     * @return {string} type of os
     */

  }, {
    key: 'getOs',
    value: function getOs() {
      return this.os;
    }
    /**
     * cameraInfo accessor
     * @return {string} info about the camera
     */

  }, {
    key: 'getCameraInfo',
    value: function getCameraInfo() {
      return this.cameraInfo;
    }
    /**
     * displaySize mutator
     * @param {number} displaySize new size of the display
     */

  }, {
    key: 'setDisplaySize',
    value: function setDisplaySize(displaySize) {
      this.displaySize = displaySize;
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
    /**
     * batteryInfo mutator
     * @param {string} batteryInfo new info about the battery
     */

  }, {
    key: 'setBatteryInfo',
    value: function setBatteryInfo(batteryInfo) {
      this.batteryInfo = batteryInfo;
    }
    /**
     * os mutator
     * @param {string} os new type of os
     */

  }, {
    key: 'setOs',
    value: function setOs(os) {
      this.os = os;
    }
    /**
     * cameraInfo mutator
     * @param {string} cameraInfo new info about the camera
     */

  }, {
    key: 'setCameraInfo',
    value: function setCameraInfo(cameraInfo) {
      this.cameraInfo = cameraInfo;
    }
  }]);

  return Tablet;
}(Computer);

module.exports = Tablet;