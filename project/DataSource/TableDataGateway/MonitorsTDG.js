'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const Monitor = require(rootPath + '/models/Monitor.js');
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
            'model_number': monitor.model_number,
            'display_size': monitor.display_size,
        }, 'id')
        .into('Monitor');
    }
    getAll() {
        let result = [];
        return connection('Monitor').select('*')
          .join('ProductDescription', 'Monitor.model_number',
                'ProductDescription.model_number')
          .then((monitors) => {
              monitors.forEach(function(monitor) {
                  result.push(new Monitor(
                      monitor.display_size,
                      monitor.price,
                      monitor.weight,
                      monitor.brand_name,
                      monitor.model_number,
                      monitor.type));
              });
              return result;
          });
    }
    getAllByModelNumber(modelNumbers) {
        let result = [];
        return connection('Monitor').select('*')
          .whereIn('model_number', modelNumbers)
          .join('ProductDescription', 'Monitor.model_number',
                'ProductDescription.model_number')
          .then((monitors) => {
              monitors.forEach(function(monitor) {
                  result.push(new Monitor(
                      monitor.display_size,
                      monitor.price,
                      monitor.weight,
                      monitor.brand_name,
                      monitor.model_number,
                      monitor.type));
              });
              return result;
          });
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
          'model_number': monitor.model_number,
          'display_size': monitor.display_size,
        }).from('Monitor').where({id: monitor.id});
    }
}
module.exports = MonitorsTDG;
