'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
/**
 * Table Data Gateway for the Computer table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class ComputersTDG {
    /**
     * Inserts a computer object into the Computer table
     * @param {Object} computer the product specifications of a computer
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new computer record in the database
     */
    add(computer) {
        return connection.insert({
            'processor_type': computer.processorType,
            'ram_size': computer.ramSize,
            'number_cpu_cores': computer.numberCpuCores,
            'harddrive_size': computer.harddriveSize,
        }, 'comp_id')
        .into('Computer');
    }

    select() {
        // TODO
    }
    /**
     * Updates the specifications of a computer in the database
     * @param {Object} computer product specification of a computer
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    update(computer) {
        // REVIEW: This was marked as todo - is this still the case? - Artem
        return connection.update({
          'processor_type': computer.processorType,
          'ram_size': computer.ramSize,
          'number_cpu_cores': computer.numberCpuCores,
          'harddrive_size': computer.harddriveSize,
        }).from('Computer').where({comp_id: computer.computerId});
    }
}
module.exports = ComputersTDG;
