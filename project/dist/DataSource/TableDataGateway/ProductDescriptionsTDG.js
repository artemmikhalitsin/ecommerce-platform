'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var connection = require('knex')(configuration);

/**
 * Table Data Gateway for the ProductDescription table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */

var ProductDescriptionsTDG = function () {
  function ProductDescriptionsTDG() {
    _classCallCheck(this, ProductDescriptionsTDG);
  }

  _createClass(ProductDescriptionsTDG, [{
    key: 'add',

    /**
     * Inserts a product description object into the ProductDescription table
     * @param {Object} productDescription the product specifications
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new product record in the database
     */
    value: function add(productDescription) {
      return connection.insert({
        'model_number': productDescription.model_number,
        'brand_name': productDescription.brand_name,
        'weight': productDescription.weight,
        'price': productDescription.price,
        'type': productDescription.type
      }, 'model_number').into('ProductDescription');
    }

    /**
     * Retrieves all product descriptions from the database
     * @return {Promise<Object[]>} promise which resolves to the list containing
     * all products in the ProductDescription table
     */

  }, {
    key: 'select',
    value: function select() {
      return connection('ProductDescription').select('*');
    }

    /*
      REVIEW: I believe select and selectById can be unified into a single method
      with a signature select(model_numbers), where model_numbers is a list.
      If the function is called with no arguments (select()) - retrieve all,
      otherwise, retrieve all corresponding to models in the list - Artem
    */
    /**
     * Retrieves a product associated with the specified model number
     * @param {string} modelNumber the model number of the product
     * @return {Promise<Object[]>} promise which resolves to the list containing
     * the product associated to the specified model number
     */

  }, {
    key: 'selectById',
    value: function selectById(modelNumber) {
      return connection('ProductDescription').where({ model_number: modelNumber }).select('*');
    }

    /**.
     * Updates the product specifications
     * @param {Object} productDescription description of a product
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */

  }, {
    key: 'update',
    value: function update(productDescription) {
      // TODO
      return connection.update({
        'brand_name': productDescription.brand_name,
        'weight': productDescription.weight,
        'price': productDescription.price,
        'type': productDescription.type
      }).from('ProductDescription').where({ model_number: productDescription.model_number });
    }
  }]);

  return ProductDescriptionsTDG;
}();

module.exports = ProductDescriptionsTDG;