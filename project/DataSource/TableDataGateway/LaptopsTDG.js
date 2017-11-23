'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
// const Laptop = require(rootPath + '/models/Laptop.js');
/**
* Table Data Gateway for the Laptop table
* @author Ekaterina Ruhlin
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

  static add(compId, laptop) {
    return connection.insert({
      'comp_id': compId,
      'model_number': laptop.modelNumber,
      'display_size': laptop.displaySize,
      'battery_info': laptop.batteryInfo,
      'os': laptop.os,
      'camera': laptop.camera,
      'touch_screen': laptop.touchscreen,
    }, 'id')
    .into('Laptop');
  }
  static getAll() {
    return connection('Laptop').select('*')
    .join('Computer', 'Laptop.comp_id', 'Computer.comp_id')
    .join('ProductDescription', 'Laptop.model_number',
    'ProductDescription.model_number');
  }
  static getByModelNumbers(modelNumbers) {
    return connection('Laptop').select('*')
    .whereIn('ProductDescription.model_number', modelNumbers)
    .join('Computer', 'Laptop.comp_id', 'Computer.comp_id')
    .join('ProductDescription', 'Laptop.model_number',
    'ProductDescription.model_number');
  }
  /**
  * Retrieves all laptop object rows except those listed in modelNumbers
  * @param {string[]} modelNumbers a list of model numbers
  * @return {Promise<Object[]>} resolves to the list of objects matching
  * the query
  */
  static getAllExcept(modelNumbers) {
    return connection('Laptop').select('*')
    .whereNotIn('ProductDescription.model_number', modelNumbers)
    .join('Computer', 'Laptop.comp_id', 'Computer.comp_id')
    .join('ProductDescription', 'Laptop.model_number',
    'ProductDescription.model_number');
  }
  /* getAll() {
  let result = [];
  return connection('Laptop').select('*')
  .join('Computer', 'Laptop.comp_id', 'Computer.comp_id')
  .join('ProductDescription', 'Laptop.model_number',
  'ProductDescription.model_number')
  .then((laptops) => {
  laptops.forEach(function(laptop) {
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
  laptop.model_number,
  laptop.type));
});
return result;
});
}*/
/* getByModelNumbers(modelNumbers) {
let result = [];
return connection('Laptop').select('*')
.whereIn('model_number', modelNumbers)
.join('Computer', 'Laptop.comp_id', 'Computer.comp_id')
.join('ProductDescription', 'Laptop.model_number',
'ProductDescription.model_number')
.then((laptops) => {
laptops.forEach(function(laptop) {
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
laptop.model_number,
laptop.type));
});
return result;
});
}*/

/**
* Updates the specifications of a laptop in the database
* @param {number} compId the id of the Computer portion specification in
* the Computer table
* @param {Object} laptop the product specifications of a laptop
* @return {Promise<number>} promise which resolves to the number of
* rows affected
*/
static update(compId, laptop) {
  // REVIEW: This was marked todo, is this still the case? - Artem
  return connection.update({
    'comp_id': laptop.computerId,
    // 'model_number': laptop.modelNumber,
    'display_size': laptop.displaySize,
    'battery_info': laptop.batteryInfo,
    'os': laptop.os,
    'camera': laptop.camera,
    'touch_screen': laptop.touchscreen,
  }).from('Laptop').where({'model_number': laptop.modelNumber});
}
}
module.exports = LaptopsTDG;
