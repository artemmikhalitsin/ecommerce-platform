'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var connection = require('knex')(configuration);

/**
 * Table Data Gateway of inventory items table
 * @author Michael Li
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE correct
 * REVIEW: PLEASE VERIFY TYPES OF PROMISES - Artem
 */

var PurchaseCollectionTDG = function () {
    function PurchaseCollectionTDG() {
        _classCallCheck(this, PurchaseCollectionTDG);
    }

    _createClass(PurchaseCollectionTDG, [{
        key: 'add',

        /**
         * Adds a new item into the table
         * @param {string} clientID The unique id of the client.
         * @param {string} serialNumber The unique serial number of the item
         * @param {string} modelNumber The model number to associate the serial to
         * @param {string} purchaseId The unique id for purchase item.
         * @return {Promise<number[]>} a promise which resolves to an array
         * containing the id of the inserted item in the table
         */
        value: function add(clientID, serialNumber, modelNumber, purchaseId) {
            return connection.insert({
                'user_id': clientID,
                'serial_number': serialNumber,
                'model_number': modelNumber,
                'purchase_Id': purchaseId
            }, 'id').into('PurchaseCollection');
        }

        /**
         * Gets all items from the Purchase Collection table
         * @return {Promise<Object[]>} a promise which resolves to an array of items
         */

    }, {
        key: 'select',
        value: function select() {
            return connection('PurchaseCollection').select('*');
        }

        /**
         * Deletes an item from the inventory given an id
         * @param {number} returnItem the id of the purchase item to be deleted,
         * as it appears in the table
         * @return {Promise<number>} a promise which resolves to the number of rows
         * affected
         */

    }, {
        key: 'delete',
        value: function _delete(returnItem) {
            return connection.from('PurchaseCollection').where({ serial_number: returnItem.serial_number }).del();
        }
    }]);

    return PurchaseCollectionTDG;
}();

module.exports = PurchaseCollectionTDG;