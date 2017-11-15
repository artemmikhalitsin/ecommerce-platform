'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Tablet table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */

var TabletsTDG = function () {
    function TabletsTDG() {
        _classCallCheck(this, TabletsTDG);
    }

    _createClass(TabletsTDG, [{
        key: 'add',

        /**
         * Inserts a tablet object into the Tablet table
         * @param {number} compId the id of the Computer portion specification in
         * the Computer table
         * @param {number} dimensionsId the id of the Dimension portion
         * specification in the Dimensions table
         * @param {Object} tablet the product specifications of a tablet
         * @return {Promise<number[]>} promise which resolves to the list containing
         * the id of the new tablet record in the database
         */
        value: function add(compId, dimensionsId, tablet) {
            return connection.insert({
                'comp_id': compId,
                'model_number': tablet.model_number,
                'dimension_id': dimensionsId,
                'display_size': tablet.display_size,
                'battery_info': tablet.battery_info,
                'os': tablet.os,
                'camera_info': tablet.camera_info
            }, 'id').into('Tablet');
        }
    }, {
        key: 'select',
        value: function select() {}
        // TODO


        /**
         * Updates the specifications of a tablet in the database
         * @param {number} compId the id of the Computer portion specification in
         * the Computer table
         * @param {number} dimensionsId the id of the Dimension portion
         * specification in the Dimensions table
         * @param {Object} tablet product specification of a tablet
         * @return {Promise<number>} promise which resolves to the number of
         * rows affected
         */

    }, {
        key: 'update',
        value: function update(compId, dimensionsId, tablet) {
            // REVIEW: This was marked todo, is this still the case? - Artem
            return connection.update({
                'comp_id': tablet.comp_id,
                'model_number': tablet.model_number,
                'dimension_id': tablet.dimension.dimensions_id,
                'display_size': tablet.display_size,
                'battery_info': tablet.battery_info,
                'os': tablet.os,
                'camera_info': tablet.camera_info
            }).from('Tablet').where({ id: tablet.id });
        }
    }]);

    return TabletsTDG;
}();

module.exports = TabletsTDG;