const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Laptop table
 * @author TODO: Ekaterina Ruhlin, Phuong-Thao Nguyen
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class LaptopsTDG {
    /**
     * Inserts a laptop object into the Laptop table
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {Object} laptop the product specifications of a laptop
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new laptop record in the database
     */
    add(compId, laptop) {
        return connection.insert({
            'comp_id': compId,
            'model_number': laptop.model_number,
            'display_size': laptop.display_size,
            'battery_info': laptop.battery_info,
            'os': laptop.os,
            'camera': laptop.camera,
            'touch_screen': laptop.touch_screen,
        }, 'id')
        .into('Laptop');
    }

    select() {
        // TODO
    }

    /**
     * Updates the specifications of a laptop in the database
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {Object} laptop the product specifications of a laptop
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    update(compId, laptop) {
        return connection.update({
          'comp_id': laptop.comp_id,
          'model_number': laptop.model_number,
          'display_size': laptop.display_size,
          'battery_info': laptop.battery_info,
          'os': laptop.os,
          'camera': laptop.camera,
          'touch_screen': laptop.touch_screen,
        }).from('Laptop').where({id: laptop.id});
    }
}
module.exports = LaptopsTDG;
