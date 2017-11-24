'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const ProductDescriptionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG');
const ComputersTDG = require(rootPath +
  '/DataSource/TableDataGateway/ComputersTDG');
/**
* Table Data Gateway for the Laptop table
* @author Ekaterina Ruhlin
* REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
*/
class LaptopsTDG {
  /**
  * Inserts a laptop object into the Laptop table
  * @param {Laptop} laptop the product specifications of a laptop
  * @return {Promise<number>} promise which resolves to
  * the id of the new laptop record in the database
  */
  static add(laptop) {
    let productInsertion = ProductDescriptionsTDG.add(laptop);
    let computerInsertion = ComputersTDG.add(laptop);
    return Promise.all([productInsertion, computerInsertion])
    .then(
      (result) => {
        return connection.insert({
          'modelNumber': parseInt(result[0]),
          'compId': parseInt(result[1]),
          'displaySize': laptop.displaySize,
          'batteryInfo': laptop.batteryInfo,
          'os': laptop.os,
          'camera': laptop.camera,
          'touchScreen': laptop.touchscreen,
        }, 'id')
        .into('Laptop');
      });
  }
  static getAll() {
    return connection('Laptop').select('*')
    .join('Computer', 'Laptop.compId', 'Computer.compId')
    .join('ProductDescription', 'Laptop.modelNumber',
    'ProductDescription.modelNumber');
  }
  static getByModelNumbers(modelNumbers) {
    return connection('Laptop').select('*')
    .whereIn('ProductDescription.modelNumber', modelNumbers)
    .join('Computer', 'Laptop.compId', 'Computer.compId')
    .join('ProductDescription', 'Laptop.modelNumber',
    'ProductDescription.modelNumber');
  }
  /**
  * Retrieves all laptop object rows except those listed in modelNumbers
  * @param {string[]} modelNumbers a list of model numbers
  * @return {Promise<Object[]>} resolves to the list of objects matching
  * the query
  */
  static getAllExcept(modelNumbers) {
    return connection('Laptop').select('*')
    .whereNotIn('ProductDescription.modelNumber', modelNumbers)
    .join('Computer', 'Laptop.compId', 'Computer.compId')
    .join('ProductDescription', 'Laptop.modelNumber',
    'ProductDescription.modelNumber');
  }
  /* getAll() {
  let result = [];
  return connection('Laptop').select('*')
  .join('Computer', 'Laptop.compId', 'Computer.compId')
  .join('ProductDescription', 'Laptop.modelNumber',
  'ProductDescription.modelNumber')
  .then((laptops) => {
  laptops.forEach(function(laptop) {
  result.push(new Laptop(
  laptop.compId,
  laptop.processorType,
  laptop.ramSize,
  laptop.numberCpuCores,
  laptop.harddriveSize,
  laptop.displaySize,
  laptop.batteryInfo,
  laptop.os,
  laptop.touchScreen,
  laptop.camera,
  laptop.price,
  laptop.weight,
  laptop.brandName,
  laptop.modelNumber,
  laptop.type));
});
return result;
});
}*/
/* getByModelNumbers(modelNumbers) {
let result = [];
return connection('Laptop').select('*')
.whereIn('modelNumber', modelNumbers)
.join('Computer', 'Laptop.compId', 'Computer.compId')
.join('ProductDescription', 'Laptop.modelNumber',
'ProductDescription.modelNumber')
.then((laptops) => {
laptops.forEach(function(laptop) {
result.push(new Laptop(
laptop.compId,
laptop.processorType,
laptop.ramSize,
laptop.numberCpuCores,
laptop.harddriveSize,
laptop.displaySize,
laptop.batteryInfo,
laptop.os,
laptop.touchScreen,
laptop.camera,
laptop.price,
laptop.weight,
laptop.brandName,
laptop.modelNumber,
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
    'compId': laptop.computerId,
    // 'modelNumber': laptop.modelNumber,
    'displaySize': laptop.displaySize,
    'batteryInfo': laptop.batteryInfo,
    'os': laptop.os,
    'camera': laptop.camera,
    'touchScreen': laptop.touchscreen,
  }).from('Laptop').where({'modelNumber': laptop.modelNumber});
}
}
module.exports = LaptopsTDG;
