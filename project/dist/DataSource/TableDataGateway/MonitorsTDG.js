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

var MonitorsTDG = function () {
    function MonitorsTDG() {
        _classCallCheck(this, MonitorsTDG);
    }

    _createClass(MonitorsTDG, [{
        key: 'add',

        /**
         * Inserts a laptop object into the Laptop table
         * @param {Object} monitor the product specifications of a monitor
         * @return {Promise<number[]>} promise which resolves to the list containing
         * the id of the new monitor record in the database
         */
        value: function add(monitor) {
            return connection.insert({
                'model_number': monitor.model_number,
                'display_size': monitor.display_size
            }, 'id').into('Monitor');
        }
    }, {
        key: 'select',
        value: function select() {}
        // TODO


        /**
         * Updates the specifications of a monitor in the database
         * @param {Object} monitor the product specifications of a monitor
         * @return {Promise<number>} promise which resolves to the number of
         * rows affected
         */

    }, {
        key: 'update',
        value: function update(monitor) {
            // REVIEW: This was marked todo, is this still the case? - Artem
            return connection.update({
                'model_number': monitor.model_number,
                'display_size': monitor.display_size
            }).from('Monitor').where({ id: monitor.id });
        }
    }]);

    return MonitorsTDG;
}();

module.exports = MonitorsTDG;