'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const Laptop = require(rootPath + '/models/Laptop.js');
/**
 * Table Data Gateway for the Laptop table
<<<<<<< HEAD
 * @author TODO: Ekaterina Ruhlin, Phuong-Thao Nguyen
=======
 * @author Eaterina Ruhlin
>>>>>>> 0f1196a47120b144c6edc1ad5ef079dd05edfd9b
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

    getAll() {
        let result = [];
        return connection('Laptop').select('*')
          .join('Computer', 'Laptop.comp_id', 'Computer.comp_id')
          .join('ProductDescription', 'Laptop.model_number',
                'ProductDescription.model_number')
          .then((laptops) => {
              laptops.forEach(function(laptop){
                  result.push(new Laptop(
                      laptop.comp_id,
                      laptop.processor_type,
                      laptop.ram_size,
                      laptop.number_cpu_cores,
                      laptop.harddrive_size,
                      laptop.display_size,
                      laptop.battery_info,
                      laptop.os,
                      laptop.touch_screen,
                      laptop.camera,
                      laptop.price,
                      laptop.weight,
                      laptop.brand_name,
                      laptop.model_number));
              });
              return result;
          });
    }
    getByModelNumbers(modelNumbers) {
        let result = [];
        return connection('Laptop').select('*')
          .whereIn('model_number', modelNumbers)
          .join('Computer', 'Laptop.comp_id', 'Computer.comp_id')
          .join('ProductDescription', 'Laptop.model_number',
                'ProductDescription.model_number')
          .then((laptops) => {
              laptops.forEach(function(laptop){
                  result.push(new Laptop(
                      laptop.comp_id,
                      laptop.processor_type,
                      laptop.ram_size,
                      laptop.number_cpu_cores,
                      laptop.harddrive_size,
                      laptop.display_size,
                      laptop.battery_info,
                      laptop.os,
                      laptop.touch_screen,
                      laptop.camera,
                      laptop.price,
                      laptop.weight,
                      laptop.brand_name,
                      laptop.model_number));
              });
              return result;
          });
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
