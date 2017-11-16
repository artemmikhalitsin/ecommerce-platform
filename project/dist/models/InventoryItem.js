'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class containing info common to all products
 * @author Ekaterina Ruhlin
 */
var rootPath = require('app-root-dir').get();
var Computer = require(rootPath + '/models/ProductDescription.js');

var InventoryItem = function () {
  /**
   * @param {number} id id
   * @param {string} serialNumber brand name
   * @param {string} modelNumber model number
   * @param {Object} productDescrition productDescription
   */
  function InventoryItem(id, serialNumber, modelNumber, productDescription) {
    _classCallCheck(this, InventoryItem);

    this.id = id;
    this.serialNumber = serialNumber;
    this.modelNumber = modelNumber;
    this.productDescription = productDescription;
  }

  /**
   * price accessor
   * @return {number} price of the product
   */


  _createClass(InventoryItem, [{
    key: 'getPrice',
    value: function getPrice() {
      return this.price;
    }
    /**
     * weight accessor
     * @return {number} weight of the product
     */

  }, {
    key: 'getWeight',
    value: function getWeight() {
      return this.weight;
    }
    /**
     * brandName accesoor
     * @return {string} brand name
     */

  }, {
    key: 'getBrandName',
    value: function getBrandName() {
      return this.brandName;
    }
    /**
     * model number accessor
     * @return {string} the alphanumeric model number of the product
     */

  }, {
    key: 'getModelNumber',
    value: function getModelNumber() {
      return this.modelNumber;
    }

    /**
     * price mutator
     * @param {number} price the new price of the product
     */

  }, {
    key: 'setPrice',
    value: function setPrice(price) {
      this.price = price;
    }
    /**
     * weight mutator
     * @param {number} weight the new weight of the product
     */

  }, {
    key: 'setWeight',
    value: function setWeight(weight) {
      this.weight = weight;
    }
    /**
     * brandName mutator
     * @param {string} brandName the new brand name of the product
     */

  }, {
    key: 'setBrandName',
    value: function setBrandName(brandName) {
      this.brandName = brandName;
    }
    /**
     * modelNumber mutator
     * @param {string} modelNumber the new model number of the product
     */

  }, {
    key: 'setModelNumber',
    value: function setModelNumber(modelNumber) {
      this.modelNumber = modelNumber;
    }
  }]);

  return InventoryItem;
}();

module.exports = InventoryItem;