'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const Tablet = require(rootPath + '/models/Tablet.js');
const Dimensions = require(rootPath + '/models/Dimensions.js');

/**
 * Table Data Gateway for the Tablet table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class TabletsTDG {
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
    static add(compId, dimensionsId, tablet) {
        return connection.insert({
            'comp_id': compId,
            'model_number': tablet.modelNumber,
            'dimension_id': dimensionsId,
            'display_size': tablet.displaySize,
            'battery_info': tablet.batteryInfo,
            'os': tablet.os,
            'camera_info': tablet.cameraInfo,
        }, 'id')
        .into('Tablet');
    }
    /* getAll() {
        let result = [];
        return connection('Tablet').select('*')
          .join('Computer', 'Tablet.comp_id', 'Computer.comp_id')
          .join('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id')
          .join('ProductDescription', 'Tablet.model_number',
            'ProductDescription.model_number')
          .then((tablets) => {
              tablets.forEach(function(tablet) {
                  result.push(new Tablet(
                      tablet.comp_id,
                      tablet.processor_type,
                      tablet.ram_size,
                      tablet.number_cpu_cores,
                      tablet.harddrive_size,
                      tablet.display_size,
                      new Dimensions(
                          tablet.dimension_id,
                          tablet.depth,
                          tablet.height,
                          tablet.width),
                      tablet.battery_info,
                      tablet.os,
                      tablet.camera_info,
                      tablet.price,
                      tablet.weight,
                      tablet.brand_name,
                      tablet.model_number,
                      tablet.type));
              });
              return result;
          });
    }*/
    static getAll() {
        return connection('Tablet').select('*')
          .join('Computer', 'Tablet.comp_id', 'Computer.comp_id')
          .join('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id')
          .join('ProductDescription', 'Tablet.model_number',
            'ProductDescription.model_number');
    }
    /* getByModelNumber(modelNumbers) {
        let result = [];
        return connection('Tablet').select('*')
          .whereIn('model_number', modelNumbers)
          .join('Computer', 'Tablet.comp_id', 'Computer.comp_id')
          .join('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id')
          .join('ProductDescription', 'Tablet.model_number',
            'ProductDescription.model_number')
          .then((tablets) => {
              tablets.forEach(function(tablet) {
                  result.push(new Tablet(
                      tablet.comp_id,
                      tablet.processor_type,
                      tablet.ram_size,
                      tablet.number_cpu_cores,
                      tablet.harddrive_size,
                      tablet.display_size,
                      new Dimensions(
                          tablet.dimension_id,
                          tablet.depth,
                          tablet.height,
                          tablet.width),
                      tablet.battery_info,
                      tablet.os,
                      tablet.camera_info,
                      tablet.price,
                      tablet.weight,
                      tablet.brand_name,
                      tablet.model_number,
                      tablet.type));
              });
              return result;
          });
    }*/
    static getByModelNumber(modelNumbers) {
        return connection('Tablet').select('*')
          .whereIn('ProductDescription.model_number', modelNumbers)
          .join('Computer', 'Tablet.comp_id', 'Computer.comp_id')
          .join('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id')
          .join('ProductDescription', 'Tablet.model_number',
            'ProductDescription.model_number');
    }
    /**
     * Retrieves all tablet object rows except those listed in modelNumbers
     * @param {string[]} modelNumbers a list of model numbers
     * @return {Promise<Object[]>} resolves to the list of objects matching
     * the query
     */
    static getAllExcept(modelNumbers) {
        return connection('Tablet').select('*')
          .whereNotIn('ProductDescription.model_number', modelNumbers)
          .join('Computer', 'Tablet.comp_id', 'Computer.comp_id')
          .join('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id')
          .join('ProductDescription', 'Tablet.model_number',
            'ProductDescription.model_number');
    }
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
    static update(compId, dimensionsId, tablet) {
        return connection.update({
          'comp_id': tablet.computerId,
          'dimension_id': tablet.dimensions.id,
          'display_size': tablet.displaySize,
          'battery_info': tablet.batteryInfo,
          'os': tablet.os,
          'camera_info': tablet.cameraInfo,
        }).from('Tablet').where({'model_number': tablet.modelNumber});
    }
}
module.exports = TabletsTDG;
