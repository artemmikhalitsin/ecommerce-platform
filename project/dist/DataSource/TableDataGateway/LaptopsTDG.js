'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Laptop table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */

var LaptopsTDG = function () {
    function LaptopsTDG() {
        _classCallCheck(this, LaptopsTDG);
    }

    _createClass(LaptopsTDG, [{
        key: 'add',

        /**
         * Inserts a laptop object into the Laptop table
         * @param {number} compId the id of the Computer portion specification in
         * the Computer table
         * @param {Object} laptop the product specifications of a laptop
         * @return {Promise<number[]>} promise which resolves to the list containing
         * the id of the new laptop record in the database
         */
        value: function add(compId, laptop) {
            return connection.insert({
                'comp_id': compId,
                'model_number': laptop.model_number,
                'display_size': laptop.display_size,
                'battery_info': laptop.battery_info,
                'os': laptop.os,
                'camera': laptop.camera,
                'touch_screen': laptop.touch_screen
            }, 'id').into('Laptop');
        }
    }, {
        key: 'select',
        value: function select() {}
        // TODO


        /**
         * Updates the specifications of a laptop in the database
         * @param {number} compId the id of the Computer portion specification in
         * the Computer table
         * @param {Object} laptop the product specifications of a laptop
         * @return {Promise<number>} promise which resolves to the number of
         * rows affected
         */

    }, {
        key: 'update',
        value: function update(compId, laptop) {
            // REVIEW: This was marked todo, is this still the case? - Artem
            return connection.update({
                'comp_id': laptop.comp_id,
                'model_number': laptop.model_number,
                'display_size': laptop.display_size,
                'battery_info': laptop.battery_info,
                'os': laptop.os,
                'camera': laptop.camera,
                'touch_screen': laptop.touch_screen
            }).from('Laptop').where({ id: laptop.id });
        }
    }]);

    return LaptopsTDG;
}();

module.exports = LaptopsTDG;