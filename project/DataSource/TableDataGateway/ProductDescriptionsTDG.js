const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway for the ProductDescription table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * @author Artem Mikhalitsin
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
      'model_number': productDescription.model_number,
      'brand_name': productDescription.brand_name,
      'weight': productDescription.weight,
      'price': productDescription.price,
      'type': productDescription.type,
    }, 'model_number').into('ProductDescription');
  }

  /**
   * Retrieves all product descriptions from the database corresponding to a
   * given model number
   * @param {string} modelNumber the model number of the product
   * @return {Promise<Object[]>} promise which resolves to the list containing
   * the appropriate object
   */
  static select(modelNumber) {
    return connection('ProductDescription')
    .select('*')
    .where('model_number', modelNumber)
    .from('ProductDescription');
  }

  /**
   * Updates the product specifications
   * @param {Object} productDescription description of a product
   * @return {Promise<number>} promise which resolves to the number of
   * rows affected
   */
  static update(productDescription) {
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
