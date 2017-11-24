'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Dimensions table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class DimensionsTDG {
    /**
     * Inserts a computer object into the Computer table
     * @param {Object} dimensions the dimensions of an object
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new dimension record in the database
     */
    static add(dimensions) {
        return connection.insert({
          'depth': dimensions.depth,
          'height': dimensions.height,
          'width': dimensions.width,
        }, 'dimensionId')
        .into('Dimensions');
    }

    static select() {
        // TODO
    }

    /**
     * Updates a dimensions row in the database
     * @param {Object} dimension the dimensions of an object
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    static update(dimension) {
        return connection.update({
          'depth': dimension.depth,
          'height': dimension.height,
          'width': dimension.width,
        }).from('Dimensions').where({dimensionId: dimension.id});
    }
}
module.exports = DimensionsTDG;
