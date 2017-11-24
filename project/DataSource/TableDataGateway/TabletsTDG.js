'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const ProductDescriptionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG');
const ComputersTDG = require(rootPath +
  '/DataSource/TableDataGateway/ComputersTDG');
const DimensionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/DimensionsTDG');

/**
 * Table Data Gateway for the Tablet table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class TabletsTDG {
    /**
     * Inserts a tablet object into the Tablet table
     * @param {Tablet} tablet the product specifications of a tablet
     * @return {Promise<number>} promise which resolves to
     * the id of the new tablet record in the database
     */
    static add(tablet) {
      let productInsertion = ProductDescriptionsTDG.add(tablet);
      let computerInsertion = ComputersTDG.add(tablet);
      let dimensionsInsertion = DimensionsTDG.add(tablet.dimensions);
      return Promise.all([productInsertion, computerInsertion,
        dimensionsInsertion])
      .then(
        (result) => {
          return connection.insert({
              'modelNumber': parseInt(result[0]),
              'compId': parseInt(result[1]),
              'dimensionId': parseInt(result[2]),
              'displaySize': tablet.displaySize,
              'batteryInfo': tablet.batteryInfo,
              'os': tablet.os,
              'cameraInfo': tablet.cameraInfo,
          }, 'id')
          .into('Tablet');
        });
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
                      tablet.harddriveSize,
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
        return connection('Tablet').select('*')
          .whereIn('ProductDescription.modelNumber', modelNumbers)
          .join('Computer', 'Tablet.compId', 'Computer.compId')
          .join('Dimensions', 'Tablet.dimensionId', 'Dimensions.dimensionId')
          .join('ProductDescription', 'Tablet.modelNumber',
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
