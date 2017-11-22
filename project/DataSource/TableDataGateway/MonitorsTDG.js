'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
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
    add(monitor) {
        return connection.insert({
            'model_number': monitor.modelNumber,
            'display_size': monitor.displaySize,
        }, 'id')
        .into('Monitor');
    }
    getAll() {
        return connection('Monitor').select('*')
          .join('ProductDescription', 'Monitor.model_number',
                'ProductDescription.model_number');
    }
    getAllByModelNumber(modelNumbers) {
        return connection('Monitor').select('*')
          .whereIn('model_number', modelNumbers)
          .join('ProductDescription', 'Monitor.model_number',
                'ProductDescription.model_number');
    }

    /**
     * Updates the specifications of a monitor in the database
     * @param {Object} monitor the product specifications of a monitor
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    update(monitor) {
      // REVIEW: This was marked todo, is this still the case? - Artem
        return connection.update({
          // 'model_number': monitor.modelNumber,
          'display_size': monitor.displaySize,
        }).from('Monitor').where({'model_number': monitor.modelNumber});
    }
}
module.exports = MonitorsTDG;
