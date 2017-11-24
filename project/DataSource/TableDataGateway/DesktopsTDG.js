'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const ProductDescriptionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
const ComputersTDG = require(rootPath +
  '/DataSource/TableDataGateway/ComputersTDG.js');
const DimensionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/DimensionsTDG.js');

/**
 * Table Data Gateway for the Desktop table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class DesktopsTDG {
    /**
     * Inserts a desktop object into the Desktop table
     * @param {Desktop} desktop a desktop object
     * @return {Promise<number>} promise which resolves to the
     * id of the new desktop record in the database
     */
    static add(desktop) {
        let productInsertion = ProductDescriptionsTDG.add(desktop);
        let computerInsertion = ComputersTDG.add(desktop);
        let dimensionsInsertion = DimensionsTDG.add(desktop.dimensions);
        return Promise.all([productInsertion, computerInsertion,
          dimensionsInsertion])
        .then(
          (result) => {
            return connection.insert({
              modelNumber: parseInt(result[0]),
              compId: parseInt(result[1]),
              dimensionId: parseInt(result[2]),
            }, 'id').into('Desktop');
          });
    }
    static getAll() {
        return connection('Desktop').select('*')
          .join('Computer', 'Desktop.compId', 'Computer.compId')
          .join('Dimensions', 'Desktop.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Desktop.modelNumber',
                'ProductDescription.modelNumber')
          .then(
            (result) => {
              return result.map(
                (item) => {
                  // Restructure so dimensions is an objects
                  item.dimensions = {
                    id: item.dimensionId,
                    height: item.height,
                    width: item.width,
                    depth: item.depth,
                  };
                  delete item.height;
                  delete item.width;
                  delete item.depth;
                  return item;
                });
            });
    }
    static getByModelNumbers(modelNumbers) {
        return connection('Desktop').select('*')
          .whereIn('ProductDescription.modelNumber', modelNumbers)
          .join('Computer', 'Desktop.compId', 'Computer.compId')
          .join('Dimensions', 'Desktop.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Desktop.modelNumber',
                'ProductDescription.modelNumber')
          .then(
            (result) => {
              return result.map(
                (item) => {
                  // Restructure so dimensions is an objects
                  item.dimensions = {
                    id: item.dimensionId,
                    height: item.height,
                    width: item.width,
                    depth: item.depth,
                  };
                  delete item.height;
                  delete item.width;
                  delete item.depth;
                  return item;
                });
            });
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
              'ProductDescription.modelNumber')
        .then(
          (result) => {
            return result.map(
              (item) => {
                // Restructure so dimensions is an objects
                item.dimensions = {
                  id: item.dimensionId,
                  height: item.height,
                  width: item.width,
                  depth: item.depth,
                };
                delete item.height;
                delete item.width;
                delete item.depth;
                return item;
              });
            });
    }
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
