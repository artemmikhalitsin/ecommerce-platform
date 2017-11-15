"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing Dimensions
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */

var Dimensions = function () {
  /**
   * Given depth, height and width creates a dimension object
   * @param {number} depth depth a product
   * @param {number} height height of a product
   * @param {number} width width of a product
   */
  function Dimensions(depth, height, width) {
    _classCallCheck(this, Dimensions);

    this.depth = depth;
    this.height = height;
    this.width = width;
  }
  /**
   * depth accessor
   * @return {number} depth
   */


  _createClass(Dimensions, [{
    key: "getDepth",
    value: function getDepth() {
      return this.depth;
    }
    /**
     * height accessor
     * @return {number} height
     */

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.height;
    }
    /**
     * width accessor
     * @return {number} width
     */

  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.width;
    }
    /**
     * depth mutator
     * @param {number} depth new depth
     */

  }, {
    key: "setDepth",
    value: function setDepth(depth) {
      this.depth = depth;
    }
    /**
     * height mutator
     * @param {number} height new height
     */

  }, {
    key: "setHeight",
    value: function setHeight() {
      this.height = height;
    }
    /**
     * width mutator
     * @param {number} width new width
     */

  }, {
    key: "setWidth",
    value: function setWidth() {
      this.width = width;
    }
  }]);

  return Dimensions;
}();

module.exports = Dimensions;