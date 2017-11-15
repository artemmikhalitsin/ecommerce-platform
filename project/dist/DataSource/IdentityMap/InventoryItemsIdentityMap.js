'use strict';
// REVIEW: UnitOfWork is never used here, consider removing - Artem
// const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryItemsIdentityMap = function () {
    /**
     * Creates an inventory item identity map
     * Loads all inventory items from database into memory
     */
    function InventoryItemsIdentityMap() {
        var _this = this;

        _classCallCheck(this, InventoryItemsIdentityMap);

        this.rootPath = require('app-root-dir').get();
        var UnitOfWork = require(this.rootPath + '/DataSource/UnitOfWork.js');
        var InventoryItemsTDG = require(this.rootPath + '/DataSource/TableDataGateway/InventoryItemsTDG.js');
        this.inventoryTDG = new InventoryItemsTDG();
        var context = this.inventoryTDG.select();
        this.InventoryItems = [];
        Promise.all([context]).then(function (values) {
            _this.InventoryItems = values[0];
        });
    }

    /**
     * Gets all the items currently stored in the Identity map
     * @return {Object[]} an array containing the items
     */


    _createClass(InventoryItemsIdentityMap, [{
        key: 'getAll',
        value: function getAll() {
            console.log("From GetAll " + this.InventoryItems);
            var result = this.InventoryItems;
            if (this.InventoryItems.length > 0) {
                return result;
            } else {
                var itemsFromTDG = this.inventoryTDG.select();
                Promise.all([itemsFromTDG]).then(function (values) {
                    result = values[0];
                });
                return result;
            }
        }

        /**
         * Gets a list of items matching given model numbers
         * @param {string[]} modelNumbers a list of alpha-numberical model numbers
         * @return {Object[]} a list of items corresponding to the given model
         * numbers
         */

    }, {
        key: 'get',
        value: function get(model_numbers) {
            return this.InventoryItems.filter(function (desc) {
                return model_numbers.findIndex(function (x) {
                    return x == desc.model_number;
                }) > -1;
            });
        }

        // TODO: Is this the same method as above? - Artem
        /**
         * Gets a list of items matching given model numbers
         * @param {string[]} modelNumbers a list of alpha-numberical model numbers
         * @return {Object[]} a list of objects corresponding to the given model
         */

    }, {
        key: 'getByModelNumbers',
        value: function getByModelNumbers(model_numbers) {
            var allItems = this.getAll();
            if (allItems != null) {
                var results = allItems.filter(function (item) {
                    return model_numbers.findIndex(function (x) {
                        return x == item.model_number;
                    }) > -1;
                });
                return results;
            } else return [];
        }

        /**
         * Adds new objects into the identity map
         * @param {Object[]} newInventoryItems a list containing new items
         */

    }, {
        key: 'add',
        value: function add(newInventoryItems) {
            for (var i = 0; i < newInventoryItems.length; i++) {
                if (this.InventoryItems.findIndex(function (p) {
                    return p.serial_number == newInventoryItems[i].serial_number;
                }) === -1) this.InventoryItems.push(newInventoryItems[i]);
            }
        }

        /**
         * Deletes items from the identity map by filtering them out
         * @param {string[]} inventoryItemsToRemove a list of alpha-numberical
         * model numbers for which the items are to be removed
         */

    }, {
        key: 'delete',
        value: function _delete(inventoryItemsToRemove) {
            this.InventoryItems.filter(function (desc) {
                return inventoryItemsToRemove.findIndex(function (x) {
                    return x == desc.model_number;
                }) === -1;
            });
        }
    }]);

    return InventoryItemsIdentityMap;
}();

module.exports = InventoryItemsIdentityMap;