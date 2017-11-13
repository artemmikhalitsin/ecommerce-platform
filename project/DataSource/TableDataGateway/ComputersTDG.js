const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Computer table
 * @author TODO: IF YOU'RE AN AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class ComputersTDG {
    /**
     * Inserts a computer object into the Computer table
     * @param {Object} computer the product specifications of a computer
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new computer record in the database
     */
    static add(computer) {
        return connection.insert({
            'processor_type': computer.processor_type,
            'ram_size': computer.ram_size,
            'number_cpu_cores': computer.number_cpu_cores,
            'harddrive_size': computer.harddrive_size,
        }, 'comp_id')
        .into('Computer');
    }
    /**
     * Retrieves computers from the database, which have an id that appears
     * in the given list
     * @param {string} modelNumber the number
     * @return {Promise<Object[]>} a promise which resolves to the list which
     * contains the matching object
     */
    static select(computerId) {
        return connection.select('*')
                         .where('comp_id', computerId)
                         .from('Computer');
    }
    /**
     * Updates the specifications of a computer in the database
     * @param {Object} computer product specification of a computer
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    static update(computer) {
        return connection.update({
          'processor_type': computer.processor_type,
          'ram_size': computer.ram_size,
          'number_cpu_cores': computer.number_cpu_cores,
          'harddrive_size': computer.harddrive_size,
        }).from('Computer').where({comp_id: computer.comp_id});
    }
}
module.exports = ComputersTDG;
