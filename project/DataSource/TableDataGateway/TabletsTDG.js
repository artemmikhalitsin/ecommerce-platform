const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);


/**
 * Table Data Gateway for the Tablet table
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class TabletsTDG {
    /**
     * Inserts a tablet object into the Tablet table
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {number} dimensionsId the id of the Dimension portion
     * specification in the Dimensions table
     * @param {Object} tablet the product specifications of a tablet
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new tablet record in the database
     */
    add(compId, dimensionsId, tablet) {
        return connection.insert({
            'comp_id': compId,
            'model_number': tablet.model_number,
            'dimension_id': dimensionsId,
            'display_size': tablet.display_size,
            'battery_info': tablet.battery_info,
            'os': tablet.os,
            'camera_info': tablet.camera_info,
        }, 'id')
        .into('Tablet');
    }
    select() {
        // TODO
    }

    /**
     * Updates the specifications of a tablet in the database
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {number} dimensionsId the id of the Dimension portion
     * specification in the Dimensions table
     * @param {Object} tablet product specification of a tablet
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    update(compId, dimensionsId, tablet) {
      // REVIEW: This was marked todo, is this still the case? - Artem
        return connection.update({
          'comp_id': tablet.comp_id,
          'model_number': tablet.model_number,
          'dimension_id': tablet.dimension.dimensions_id,
          'display_size': tablet.display_size,
          'battery_info': tablet.battery_info,
          'os': tablet.os,
          'camera_info': tablet.camera_info,
        }).from('Tablet').where({id: tablet.id});
    }
}
module.exports = TabletsTDG;
