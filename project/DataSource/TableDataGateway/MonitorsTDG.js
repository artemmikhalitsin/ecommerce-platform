const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Laptop table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class MonitorsTDG {
    /**
     * Inserts a laptop object into the Laptop table
     * @param {Object} monitor the product specifications of a monitor
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new monitor record in the database
     */
    static add(monitor) {
        return connection.insert({
            'model_number': monitor.model_number,
            'display_size': monitor.display_size,
        }, 'id')
        .into('Monitor');
    }
    static select() {
        // TODO
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
          'model_number': monitor.model_number,
          'display_size': monitor.display_size,
        }).from('Monitor').where({id: monitor.id});
    }
}
module.exports = MonitorsTDG;
