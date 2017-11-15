"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a Laptop
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */
var Laptop = function (_Computer) {
  _inherits(Laptop, _Computer);

  /**
   * Given attributes of a laptop, constructs a new object
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
   */
  function Laptop(processorType, ramSize, numberCpuCores, harddriveSize, displaySize, batteryInfo, os, touchscreen, camera, price, weight, brandName, modelNumber) {
    _classCallCheck(this, Laptop);

    var _this = _possibleConstructorReturn(this, (Laptop.__proto__ || Object.getPrototypeOf(Laptop)).call(this, processorType, ramSize, numberCpuCores, harddriveSize, price, weight, brandName, modelNumber));

    _this.displaySize = displaySize;
    _this.batteryInfo = batteryInfo;
    _this.os = os;
    _this.touchscreen = touchscreen;
    _this.camera = camera;
    return _this;
  }

  /**
   * displaySize accessor
   * @return {number} size of the display
   */


  _createClass(Laptop, [{
    key: "getDisplaySize",
    value: function getDisplaySize() {
      return this.displaySize;
    }
    /**
     * touchscreen accessor
     * @return {boolean} true if laptop has a touschreen, otherwise false
     */

  }, {
    key: "getTouchscreen",
    value: function getTouchscreen() {
      return this.touchscreen;
    }
    /**
    * camera accessor
    * @return {boolean} true if laptop has a camera, otherwise false
    */

  }, {
    key: "getCamera",
    value: function getCamera() {
      return this.camera;
    }
    /**
     * batteryInfo accessor
     * @return {string} battery info
     */

  }, {
    key: "getBatteryInfo",
    value: function getBatteryInfo() {
      return this.batteryInfo;
    }
    /**
     * os accessor
     * @return {string} type of os
     */

  }, {
    key: "getOs",
    value: function getOs() {
      return this.os;
    }
    /**
     * displaySize mutator
     * @param {number} displaySize new size of the display
     */

  }, {
    key: "setDisplaySize",
    value: function setDisplaySize(displaySize) {
      this.displaySize = displaySize;
    }
    /**
     * touchscreen mutator
     * @param {boolean} touchscreen new value for touchscreen
     */

  }, {
    key: "setTouchscreen",
    value: function setTouchscreen(touchscreen) {
      this.touchscreen = touchscreen;
    }
    /**
     * camera mutator
     * @param {boolean} camera new value for camera
     */

  }, {
    key: "setCamera",
    value: function setCamera(camera) {
      this.camera = camera;
    }
    /**
     * batteryInfo mutator
     * @param {string} batteryInfo new info about the battery
     */

  }, {
    key: "setBatteryInfo",
    value: function setBatteryInfo(batteryInfo) {
      this.batteryInfo = batteryInfo;
    }
    /**
     * os mutator
     * @param {string} os new type of os
     */

  }, {
    key: "setOs",
    value: function setOs(os) {
      this.os = os;
    }
  }]);

  return Laptop;
}(Computer);

module.exports = Laptop;