'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
// const Desktop = require(rootPath + '/models/Desktop.js');
// const Dimensions = require(rootPath + '/models/Dimensions.js');

/**
 * Table Data Gateway for the Desktop table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class DesktopsTDG {
    /**
     * Inserts a desktop object into the Desktop table
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {number} dimensionsId the id of the Dimension portion
     * specification in the Dimensions table
     * @param {Object} desktop the product specifications of a desktop
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new desktop record in the database
     */
    static add(compId, dimensionsId, desktop) {
        return connection.insert({
            'compId': compId,
            'modelNumber': desktop.modelNumber,
            'dimensionId': dimensionsId,
        }, 'id')
        .into('Desktop');
    }
    static getAll() {
        return connection('Desktop').select('*')
          .join('Computer', 'Desktop.compId', 'Computer.compId')
          .join('Dimensions', 'Desktop.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Desktop.modelNumber',
                'ProductDescription.modelNumber');
    }
    static getByModelNumbers(modelNumbers) {
        return connection('Desktop').select('*')
          .whereIn('ProductDescription.modelNumber', modelNumbers)
          .join('Computer', 'Desktop.compId', 'Computer.compId')
          .join('Dimensions', 'Desktop.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Desktop.modelNumber',
                'ProductDescription.modelNumber');
    }
    /**
     * Retrieves all desktop object rows except those listed in modelNumbers
     * @param {string[]} modelNumbers a list of model numbers
     * @return {Promise<Object[]>} resolves to the list of objects matching
     * the query
     */
    static getAllExcept(modelNumbers) {
      return connection('Desktop').select('*')
        .whereNotIn('ProductDescription.modelNumber', modelNumbers)
        .join('Computer', 'Desktop.compId', 'Computer.compId')
        .join('Dimensions', 'Desktop.dimensionId', 'Dimensions.dimensionId')
        .join('ProductDescription', 'Desktop.modelNumber',
              'ProductDescription.modelNumber');
    }
    /* getAll() {
        let result = [];
        return connection('Desktop').select('*')
          .join('Computer', 'Desktop.compId', 'Computer.compId')
          .join('Dimensions', 'Desktop.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Desktop.modelNumber',
                'ProductDescription.modelNumber')
          .then((desktops) => {
              desktops.forEach(function(desktop) {
                  let d = new Desktop(
                      desktop.processorType,
                      desktop.ramSize,
                      desktop.numberCpuCores,
                      desktop.hardDriveSize,
                      new Dimensions(
                          desktop.dimensionId,
                          desktop.depth,
                          desktop.height,
                          desktop.width),
                          */
    //                   desktop.price,
    //                   desktop.weight,
    //                   desktop.brand_name,
    //                   desktop.model_number,
    //                   desktop.comp_id,
    //                   desktop.type);
    //               result.push(d);
    //           });
    //           return result;
    //       });
    // }*/
    /* getByModelNumbers(modelNumbers) {
        let result = [];
        return connection('Desktop').select('*')
          .whereIn('modelNumber', modelNumbers)
          .join('Computer', 'Desktop.compId', 'Computer.compId')
          .join('Dimensions', 'Desktop.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Desktop.modelNumber',
                'ProductDescription.modelNumber')
          .then((desktops) => {
              desktops.forEach(function(desktop) {
                  result.push(new Desktop(
                      desktop.processorType,
                      desktop.ramSize,
                      desktop.numberCpuCores,
                      desktop.hardDriveSize,
                      new Dimensions(
                          desktop.dimensionId,
                          desktop.depth,
                          desktop.height,
                          desktop.width),
                      desktop.price,
                      desktop.weight,
                      desktop.brandName,
                      desktop.modelNumber,
                      desktop.compId,
                      desktop.type));
          });
          return result;
      });
    }*/
    /**
     * Updates the specifications of a desktop in the database
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {number} dimensionsId the id of the Dimension portion
     * specification in the Dimensions table
     * @param {Object} desktop product specification of a desktop
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    static update(compId, dimensionsId, desktop) {
        return connection.update({
         'compId': desktop.computerId,
         'modelNumber': desktop.modelNumber,
         'dimensionId': desktop.dimensions.id,
      }).from('Desktop').where({'modelNumber': desktop.modelNumber});
    }
}
module.exports = DesktopsTDG;
