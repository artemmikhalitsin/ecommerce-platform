'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const ProductDescriptionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG');

/**
 * Table Data Gateway for the Monitor table
 * @author Ekaterina Ruhlin
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class MonitorsTDG {
    /**
     * Inserts a Monitor object into the Monitor table
     * @param {Object} monitor the product specifications of a monitor
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new monitor record in the database
     */

    static add(monitor) {
      return ProductDescriptionsTDG.add(monitor)
      .then(
        (modelNumber) => {
          return connection.insert({
              'modelNumber': monitor.modelNumber,
              'displaySize': monitor.displaySize,
          }, 'id')
          .into('Monitor');
      })
      .then( (id) => {
        console.log(`monitor id is then ${id}`);
      });
    }

    static getAll() {
        return connection('Monitor').select('*')
          .join('ProductDescription', 'Monitor.modelNumber',
                'ProductDescription.modelNumber');
    }

    static getByModelNumbers(modelNumbers) {
        return connection('Monitor').select('*')
          .whereIn('ProductDescription.modelNumber', modelNumbers)
          .join('ProductDescription', 'Monitor.modelNumber',
                'ProductDescription.modelNumber');
    }
    /**
     * Retrieves all monitor object rows except those listed in modelNumbers
     * @param {string[]} modelNumbers a list of model numbers
     * @return {Promise<Object[]>} resolves to the list of objects matching
     * the query
     */
    static getAllExcept(modelNumbers) {
        return connection('Monitor').select('*')
          .whereNotIn('ProductDescription.modelNumber', modelNumbers)
          .join('ProductDescription', 'Monitor.modelNumber',
                'ProductDescription.modelNumber');
    }
    /**
     * Updates the specifications of a monitor in the database
     * @param {Object} monitor the product specifications of a monitor
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    static update(monitor) {
      // REVIEW: This was marked todo, is this still the case? - Artem
        return connection.update({
          // 'modelNumber': monitor.modelNumber,
          'displaySize': monitor.displaySize,
        }).from('Monitor').where({'modelNumber': monitor.modelNumber});
    }
}
module.exports = MonitorsTDG;
