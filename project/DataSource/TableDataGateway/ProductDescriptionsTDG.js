'use strict';
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

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
  add(productDescription) {
    return connection.insert({
      'model_number': productDescription.model_number,
      'brand_name': productDescription.brand_name,
      'weight': productDescription.weight,
      'price': productDescription.price,
      'type': productDescription.type,
    }, 'model_number').into('ProductDescription');
  }

  /**
   * Retrieves all product descriptions from the database
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * all products in the ProductDescription table
   */
  getAll() {
    return connection('ProductDescription').select('*');
  }
  getByModelNumber(modelNumber) {
    return connection('ProductDescription')
      .select('*')
      .where({model_number: modelNumber});
  }

  /*
    REVIEW: I believe select and selectById can be unified into a single method
    with a signature select(model_numbers), where model_numbers is a list.
    If the function is called with no arguments (select()) - retrieve all,
    otherwise, retrieve all corresponding to models in the list - Artem
  */
  /**
   * Retrieves a product associated with the specified model number
   * @param {string} modelNumber the model number of the product
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * the product associated to the specified model number
   */
  selectById(modelNumber) {
    return connection('ProductDescription')
                .where({model_number: modelNumber}).select('*');
  }

  /** .
   * Updates the product specifications
   * @param {Object} productDescription description of a product
   * @return {Promise<number>} promise which resolves to the number of
   * rows affected
   */
  update(productDescription) {
    // TODO
    return connection
      .update({
        'brand_name': productDescription.brand_name,
        'weight': productDescription.weight,
        'price': productDescription.price,
        'type': productDescription.type,
      })
      .from('ProductDescription')
      .where({model_number: productDescription.model_number});
  }
}
module.exports = ProductDescriptionsTDG;
