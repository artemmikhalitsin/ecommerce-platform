const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

/**
 * Table Data Gateway for the Desktop table
 * @author TODO: IF YOU'RE AN AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * @author Artem Mikhalitsin
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
    static add(compId, dimensionsId, desktopInfo) {
        return connection.insert({
            'comp_id': compId,
            'dimension_id': dimensionsId,
            'model_number': desktopInfo.model_number,
        }, 'id')
        .into('Desktop');
    }
    /**
     * Retrieves desktop entries from the database given a list of id's to match
     * @param {number} modelNumber model number of the item to retrieve
     * @return {Promise<Object[]>} array containing the matching item
     */
    static select(modelNumber) {
      return connection
      .select('*')
      .where('model_number', modelNumber)
      .from('Desktop');
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
    static update(compId, dimensionsId, desktop) {
        return connection.update({
        'model_number': desktop.model_number,
        'dimension_id': desktop.dimension.dimensions_id,
      }).from('Desktop').where({id: desktop.id});
      // REVIEW: This was marked todo, is this still the case? - Artem
    }
}
module.exports = DesktopsTDG;
