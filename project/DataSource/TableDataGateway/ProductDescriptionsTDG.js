'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const ProductDescription = require(rootPath + '/models/ProductDescription.js');

/**
 * Table Data Gateway for the ProductDescription table
 * @author Ekaterina Ruhlin
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class ProductDescriptionsTDG {
  /**
   * Inserts a product description object into the ProductDescription table
   * @param {Object} productDescription the product specifications
   * @return {Promise<number[]>} promise which resolves to the list containing
   * the id of the new product record in the database
   */
  static add(productDescription) {
    return connection.insert({
      'modelNumber': productDescription.modelNumber,
      'brandName': productDescription.brandName,
      'weight': productDescription.weight,
      'price': productDescription.price,
      'type': productDescription.type,
      'isAvailable': productDescription.isAvailable,
    }, 'modelNumber').into('ProductDescription');
  }

  /**
   * Retrieves all product descriptions from the database
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * all products in the ProductDescription table
   */
  static getAll() {
    return connection('ProductDescription').select('*');
  }

  static getByModelNumber(modelNumber) {
    return connection('ProductDescription')
      .select('*')
      .where({modelNumber: modelNumber});
  }

  /*
    REVIEW: I believe select and selectById can be unified into a single method
    with a signature select(modelNumbers), where modelNumbers is a list.
    If the function is called with no arguments (select()) - retrieve all,
    otherwise, retrieve all corresponding to models in the list - Artem
  */

  /** .
   * Updates the product specifications
   * @param {Object} productDescription description of a product
   * @return {Promise<number>} promise which resolves to the number of
   * rows affected
   */
  static update(productDescription) {
    return connection
      .update({
        'brandName': productDescription.brandName,
        'weight': productDescription.weight,
        'price': productDescription.price,
        'type': productDescription.type,
        'isAvailable': productDescription.isAvailable,
      })
      .from('ProductDescription')
      .where({modelNumber: productDescription.modelNumber});
  }
  /**
   * Deletes an item from the inventory given an id
   * @param {number} prodDescription the model number of the description to be
   * deleted,as it appears in the table
   * @return {Promise<number>} a promise which resolves to the number of rows
   * affected
   */
  static delete(prodDescription) {
      console.log(productDescription);
      console.log('in productDescriptionTDG');
      return connection.from('ProductDescription').where(
        {'modelNumber': prodDescription.modelNumber}
      ).del();
  }
}
module.exports = ProductDescriptionsTDG;
