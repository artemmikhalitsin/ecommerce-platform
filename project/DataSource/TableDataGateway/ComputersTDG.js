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
    static add(computer) {
        return connection.insert({
            'processorType': computer.processorType,
            'ramSize': computer.ramSize,
            'numberCpuCores': computer.numberCpuCores,
            'harddriveSize': computer.harddriveSize,
        }, 'compId')
        .into('Computer');
    }

    static select() {
        // TODO
    }
    /**
     * Updates the specifications of a computer in the database
     * @param {Object} computer product specification of a computer
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    static update(computer) {
        return connection.update({
          'processorType': computer.processorType,
          'ramSize': computer.ramSize,
          'numberCpuCores': computer.numberCpuCores,
          'harddriveSize': computer.harddriveSize,
        }).from('Computer').where({compId: computer.computerId});
    }
}
module.exports = ComputersTDG;
