'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
// const Tablet = require(rootPath + '/models/Tablet.js');
// const Dimensions = require(rootPath + '/models/Dimensions.js');

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
            'compId': compId,
            'modelNumber': tablet.modelNumber,
            'dimensionId': dimensionsId,
            'displaySize': tablet.displaySize,
            'batteryInfo': tablet.batteryInfo,
            'os': tablet.os,
            'cameraInfo': tablet.cameraInfo,
        }, 'id')
        .into('Tablet');
    }
    /* getAll() {
        let result = [];
        return connection('Tablet').select('*')
          .join('Computer', 'Tablet.compId', 'Computer.compId')
          .join('Dimensions', 'Tablet.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Tablet.modelNumber',
            'ProductDescription.modelNumber')
          .then((tablets) => {
              tablets.forEach(function(tablet) {
                  result.push(new Tablet(
                      tablet.compId,
                      tablet.processorType,
                      tablet.ramSize,
                      tablet.numberCpuCores,
                      tablet.hardDriveSize,
                      tablet.displaySize,
                      new Dimensions(
                          tablet.dimensionId,
                          tablet.depth,
                          tablet.height,
                          tablet.width),
                      tablet.batteryInfo,
                      tablet.os,
                      tablet.cameraInfo,
                      tablet.price,
                      tablet.weight,
                      tablet.brandName,
                      tablet.modelNumber,
                      tablet.type));
              });
              return result;
          });
    }*/
    static getAll() {
        return connection('Tablet').select('*')
          .join('Computer', 'Tablet.compId', 'Computer.compId')
          .join('Dimensions', 'Tablet.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Tablet.modelNumber',
            'ProductDescription.modelNumber');
    }
    /* getByModelNumber(modelNumbers) {
        let result = [];
        return connection('Tablet').select('*')
          .whereIn('modelNumber', modelNumbers)
          .join('Computer', 'Tablet.compId', 'Computer.compId')
          .join('Dimensions', 'Tablet.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Tablet.modelNumber',
            'ProductDescription.modelNumber')
          .then((tablets) => {
              tablets.forEach(function(tablet) {
                  result.push(new Tablet(
                      tablet.compId,
                      tablet.processorType,
                      tablet.ramSize,
                      tablet.numberCpuCores,
                      tablet.hardDriveSize,
                      tablet.displaySize,
                      new Dimensions(
                          tablet.dimensionId,
                          tablet.depth,
                          tablet.height,
                          tablet.width),
                      tablet.batteryInfo,
                      tablet.os,
                      tablet.cameraInfo,
                      tablet.price,
                      tablet.weight,
                      tablet.brandName,
                      tablet.modelNumber,
                      tablet.type));
              });
              return result;
          });
    }*/
    static getByModelNumbers(modelNumbers) {
        return connection('Tablet').select('*')
          .whereIn('ProductDescription.modelNumber', modelNumbers)
          .join('Computer', 'Tablet.compId', 'Computer.compId')
          .join('Dimensions', 'Tablet.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Tablet.modelNumber',
            'ProductDescription.modelNumber');
    }
    /**
     * Retrieves all tablet object rows except those listed in modelNumbers
     * @param {string[]} modelNumbers a list of model numbers
     * @return {Promise<Object[]>} resolves to the list of objects matching
     * the query
     */
    static getAllExcept(modelNumbers) {
        return connection('Tablet').select('*')
          .whereNotIn('ProductDescription.modelNumber', modelNumbers)
          .join('Computer', 'Tablet.compId', 'Computer.compId')
          .join('Dimensions', 'Tablet.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Tablet.modelNumber',
            'ProductDescription.modelNumber');
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
          'compId': tablet.computerId,
          'dimensionId': tablet.dimensions.id,
          'displaySize': tablet.displaySize,
          'batteryInfo': tablet.batteryInfo,
          'os': tablet.os,
          'cameraInfo': tablet.cameraInfo,
        }).from('Tablet').where({'modelNumber': tablet.modelNumber});
    }
}
module.exports = TabletsTDG;
