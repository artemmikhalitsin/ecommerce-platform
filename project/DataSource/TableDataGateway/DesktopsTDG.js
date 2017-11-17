'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const Desktop = require(rootPath + '/models/Desktop.js');
const Dimensions = require(rootPath + '/models/Dimensions.js');

/**
 * Table Data Gateway for the Desktop table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class DesktopsTDG {
    /**
     * Inserts a desktop object into the Desktop table
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {number} dimensionsId the id of the Dimension portion
     * specification in the Dimensions table
     * @param {Object} desktop the product specifications of a desktop
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new desktop record in the database
     */
    add(compId, dimensionsId, desktop) {
        return connection.insert({
            'comp_id': compId,
            'model_number': desktop.model_number,
            'dimension_id': dimensionsId,
        }, 'id')
        .into('Desktop');
    }

    getAll() {
        let result = [];
        return connection('Desktop').select('*')
          .join('Computer', 'Desktop.comp_id', 'Computer.comp_id')
          .join('Dimensions', 'Desktop.dimension_id', 'Dimensions.dimension_id')
          .join('ProductDescription', 'Desktop.model_number',
                'ProductDescription.model_number')
          .then((desktops) => {
              desktops.forEach(function(desktop) {
                  let d = new Desktop(
                      desktop.processor_type,
                      desktop.ram_size,
                      desktop.number_cpu_cores,
                      desktop.harddrive_size,
                      new Dimensions(
                          desktop.dimension_id,
                          desktop.depth,
                          desktop.height,
                          desktop.width),
                      desktop.price,
                      desktop.weight,
                      desktop.brand_name,
                      desktop.model_number,
                      desktop.comp_id,
                      desktop.type);
                  result.push(d);
              });
              return result;
          });
    }
    getByModelNumbers(modelNumbers) {
        let result = [];
        return connection('Desktop').select('*')
          .whereIn('model_number', modelNumbers)
          .join('Computer', 'Desktop.comp_id', 'Computer.comp_id')
          .join('Dimensions', 'Desktop.dimension_id', 'Dimensions.dimension_id')
          .join('ProductDescription', 'Desktop.model_number',
                'ProductDescription.model_number')
          .then((desktops) => {
              desktops.forEach(function(desktop) {
                  result.push(new Desktop(
                      desktop.processor_type,
                      desktop.ram_size,
                      desktop.number_cpu_cores,
                      desktop.harddrive_size,
                      new Dimensions(
                          desktop.dimension_id,
                          desktop.depth,
                          desktop.height,
                          desktop.width),
                      desktop.price,
                      desktop.weight,
                      desktop.brand_name,
                      desktop.model_number,
                      desktop.comp_id,
                      desktop.type));
          });
          return result;
      });
    }
    /**
     * Updates the specifications of a desktop in the database
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {number} dimensionsId the id of the Dimension portion
     * specification in the Dimensions table
     * @param {Object} desktop product specification of a desktop
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    update(compId, dimensionsId, desktop) {
        return connection.update({
        'model_number': desktop.model_number,
        'dimension_id': desktop.dimension.dimensions_id,
      }).from('Desktop').where({id: desktop.id});
      // REVIEW: This was marked todo, is this still the case? - Artem
    }
}
module.exports = DesktopsTDG;
