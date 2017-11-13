'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const Desktop = require(rootPath + 'models/Desktop.js')
const DesktopTDG = require(rootPath
  + 'DataSource/TableDataGateway/DesktopsTDG.js');
const ComputerTDG = require(rootPath
  + 'DataSource/TableDataGateway/ComputersTDG.js');
const DimensionTDG = require(rootPath
  + 'DataSource/TableDataGateway/DimensionsTDG.js');
const ProductTDG = require(rootPath
  + 'DataSource/TableDataGateway/ProductDescriptionsTDG.js');
const IMap = require(rootPath
  + 'DataSource/IdentityMap/ProductDescriptionsIdentityMap.js').instance();

/**
 * Repository for Desktops
 * @author TODO: IF YOU'RE THE AUTHOR, ATTRIBUTE THIS CLASS TO YOURSELF
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT - Artem
 */
class DesktopRepository {
  /**
   * Constructor initializes the repo's unit of work
   */
  constructor() {
    this.uow = new UnitOfWork();
  }

  /**
   * Retrieves all items from the Dekstop table of the database
   * @param {string} modelNumber the model number of the desktop
   * @return {Promise<Object>} promise which resolves to the desktop
   */
  static get(modelNumber) {
    return new Promise( (resolve, reject) => {
      //Attempt to fetch product from the identity map
      let desktop = IMap.get(modelNumber);
      if(desktop) {
        resolve(desktop);
      }

      //Object not available in the identity map, fetch from tables
      DesktopTDG.select(modelNumber)
      .then(
        //First fetch desktop info, which contains references to Computers
        //and Dimensions tables
        (desktopInfo) => {
          let computerId = desktopInfo.comp_id
          let dimensionId = desktopInfo.dimension_id
          computerRow = ComputerTDG.select(computerId)
          dimensionRow = DimensionTDG.select(dimensionId)
          //Fetch computer and dimension table rows
          Promise.all([computerRow, dimensionRow])
          .then(
            (results) => {
              computerInfo = results[0];
              dimensionInfo = results[1];
              //Create the new Desktop object
              desktop = new Desktop(
                computerInfo,
                dimensionsInfo,
                productInfo
              )
              //Add it to the identity map
              IMap.add(desktop);
              //Resolve it
              resolve(desktop):
            }
          )

        }
      )
    });
  }


}
module.exports = DesktopRepository;
