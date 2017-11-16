const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Laptop table
 * @author TODO: Ekaterina Ruhlin, Phuong-Thao Nguyen
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class MonitorsTDG {
    /**
     * Inserts a laptop object into the Laptop table
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
    select() {
        // TODO
    }

    /**
     * Updates the specifications of a monitor in the database
     * @param {Object} monitor the product specifications of a monitor
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    update(monitor) {
        return connection.update({
          'model_number': monitor.model_number,
          'display_size': monitor.display_size,
        }).from('Monitor').where({id: monitor.id});
    }
}
module.exports = MonitorsTDG;
