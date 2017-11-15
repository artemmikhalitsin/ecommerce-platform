'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rootPath = require('app-root-dir').get();
// REVIEW: UnitOfWork is never used here, consider removing - Artem
// const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
var ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');

/**
 * Identity map of product descriptions
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */

var ProductDescriptionsIdentityMap = function () {
    /**
     * Creates an product description identity map
     * Loads all product descriptions from database into memory
     */
    function ProductDescriptionsIdentityMap() {
        var _this = this;

        _classCallCheck(this, ProductDescriptionsIdentityMap);

        this.productDescTDG = new ProductDescriptionsTDG();
        this.productDesc = [];

        var context = this.productDescTDG.select();
        Promise.all([context]).then(function (values) {
            _this.productDesc = values[0];
        });
    }

    /**
     * Gets all the products currently stored in the Identity map
     * @return {Object[]} an array containing the products
     */


    _createClass(ProductDescriptionsIdentityMap, [{
        key: 'getAll',
        value: function getAll() {
            var result = this.productDesc;
            if (this.productDesc.length > 0) {
                return result;
            } else {
                var productsFromTDG = this.productDescTDG.select();
                Promise.all([productsFromTDG]).then(function (values) {
                    result = values[0];
                });
                return result;
            }
        }

        // TODO: Is this the same method as above? - Artem
        /**
         * Gets a list of products matching given model numbers
         * @param {string[]} modelNumbers a list of alpha-numberical model numbers
         * @return {Object[]} a list of products corresponding to the given model
         * numbers
         */

    }, {
        key: 'get',
        value: function get(modelNumbers) {
            var allProducts = this.getAll();
            if (allProducts != null) {
                var results = allProducts.filter(function (desc) {
                    return modelNumbers.includes(desc.model_number);
                });
                return results;
            } else return [];
        }

        /**
         * Adds new objects into the identity map
         * @param {Object[]} newProductDescriptions a list containing new products
         */

    }, {
        key: 'add',
        value: function add(newProductDescriptions) {
            // If list contains no items, do no computation
            if (newProductDescriptions.length > 0) {
                // Extract model numbers of each product
                var existingModelNumbers = this.productDesc.map(function (product) {
                    return product.model_number;
                });
                for (var i = 0; i < newProductDescriptions.length; i++) {
                    var productToAdd = newProductDescriptions[i];
                    // Add only if item isn't already in the known model numbers
                    if (!existingModelNumbers.includes(productToAdd.model_number)) {
                        this.productDesc.push(productToAdd);
                    }
                }
            }
        }
        /**
         * Deletes items from the identity map by filtering them out
         * @param {string[]} productDescriptionsToRemove a list of alpha-numberical
         * model numbers, for which the products are to be removed
         */

    }, {
        key: 'delete',
        value: function _delete(productDescriptionsToRemove) {
            this.productDesc = this.productDesc.filter(function (desc) {
                return !productDescriptionsToRemove.includes(desc.model_number);
            });
        }
    }]);

    return ProductDescriptionsIdentityMap;
}();

module.exports = ProductDescriptionsIdentityMap;