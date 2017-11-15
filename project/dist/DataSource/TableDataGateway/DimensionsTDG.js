'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Dimensions table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */

var DimensionsTDG = function () {
    function DimensionsTDG() {
        _classCallCheck(this, DimensionsTDG);
    }

    _createClass(DimensionsTDG, [{
        key: 'add',

        /**
         * Inserts a computer object into the Computer table
         * @param {Object} dimension the dimensions of an object
         * @return {Promise<number[]>} promise which resolves to the list containing
         * the id of the new dimension record in the database
         */
        value: function add(dimension) {
            return connection.insert({
                'depth': dimension.depth,
                'height': dimension.height,
                'width': dimension.width
            }, 'id').into('Dimensions');
        }
    }, {
        key: 'select',
        value: function select() {}
        // TODO


        /**
         * Updates a dimensions row in the database
         * @param {Object} dimension the dimensions of an object
         * @return {Promise<number>} promise which resolves to the number of
         * rows affected
         */

    }, {
        key: 'update',
        value: function update(dimension) {
            return connection.update({
                'depth': dimension.depth,
                'height': dimension.height,
                'width': dimension.width
            }).from('Dimensions').where({ dimension_id: dimension.dimensions_id });
        }
    }]);

    return DimensionsTDG;
}();

module.exports = DimensionsTDG;