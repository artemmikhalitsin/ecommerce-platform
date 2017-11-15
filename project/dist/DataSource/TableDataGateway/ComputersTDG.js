'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var connection = require('knex')(configuration);
/**
 * Table Data Gateway for the Computer table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */

var ComputersTDG = function () {
    function ComputersTDG() {
        _classCallCheck(this, ComputersTDG);
    }

    _createClass(ComputersTDG, [{
        key: 'add',

        /**
         * Inserts a computer object into the Computer table
         * @param {Object} computer the product specifications of a computer
         * @return {Promise<number[]>} promise which resolves to the list containing
         * the id of the new computer record in the database
         */
        value: function add(computer) {
            return connection.insert({
                'processor_type': computer.processor_type,
                'ram_size': computer.ram_size,
                'number_cpu_cores': computer.number_cpu_cores,
                'harddrive_size': computer.harddrive_size
            }, 'comp_id').into('Computer');
        }
    }, {
        key: 'select',
        value: function select() {}
        // TODO

        /**
         * Updates the specifications of a computer in the database
         * @param {Object} computer product specification of a computer
         * @return {Promise<number>} promise which resolves to the number of
         * rows affected
         */

    }, {
        key: 'update',
        value: function update(computer) {
            // REVIEW: This was marked as todo - is this still the case? - Artem
            return connection.update({
                'processor_type': computer.processor_type,
                'ram_size': computer.ram_size,
                'number_cpu_cores': computer.number_cpu_cores,
                'harddrive_size': computer.harddrive_size
            }).from('Computer').where({ comp_id: computer.comp_id });
        }
    }]);

    return ComputersTDG;
}();

module.exports = ComputersTDG;