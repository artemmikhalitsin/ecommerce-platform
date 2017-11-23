'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const ProductDescriptionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG');

const productDescTDG = new ProductDescriptionsTDG;

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
    static insert(monitor) {
      return productDescTDG.update(electronic)
        .transacting(trx).then(() => {
            return connection.insert({
            'model_number': monitor.modelNumber,
            'display_size': monitor.displaySize,
        }, 'id')
        .into('Monitor');
      });
    }
    static add(monitor) {
        return connection.insert({
            'model_number': monitor.modelNumber,
            'display_size': monitor.displaySize,
        }, 'id')
        .into('Monitor');
    }
    static getAll() {
        return connection('Monitor').select('*')
          .join('ProductDescription', 'Monitor.model_number',
                'ProductDescription.model_number');
    }
    static getAllByModelNumber(modelNumbers) {
        return connection('Monitor').select('*')
          .whereIn('ProductDescription.model_number', modelNumbers)
          .join('ProductDescription', 'Monitor.model_number',
                'ProductDescription.model_number');
    }
    /**
     * Retrieves all monitor object rows except those listed in modelNumbers
     * @param {string[]} modelNumbers a list of model numbers
     * @return {Promise<Object[]>} resolves to the list of objects matching
     * the query
     */
    static getAllExcept(modelNumbers) {
        return connection('Monitor').select('*')
          .whereNotIn('ProductDescription.model_number', modelNumbers)
          .join('ProductDescription', 'Monitor.model_number',
                'ProductDescription.model_number');
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
          // 'model_number': monitor.modelNumber,
          'display_size': monitor.displaySize,
        }).from('Monitor').where({'model_number': monitor.modelNumber});
    }
}
module.exports = MonitorsTDG;
