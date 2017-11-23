'use strict';
const rootPath = require('app-root-dir').get();
const Promise = require('bluebird');
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const productDescTDG = require(rootPath
  + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
const DesktopsTDG = require(rootPath
  + '/DataSource/TableDataGateway/DesktopsTDG.js');
const LaptopsTDG = require(rootPath
  + '/DataSource/TableDataGateway/LaptopsTDG.js');
const MonitorsTDG = require(rootPath
  + '/DataSource/TableDataGateway/MonitorsTDG.js');
const TabletsTDG = require(rootPath
  + '/DataSource/TableDataGateway/TabletsTDG.js');
// Retrieve instance of singleton identity map
const productIMAP = require(rootPath
  + '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js').instance();

const ProductDescription = require(rootPath + '/models/ProductDescription.js');
const Tablet = require(rootPath + '/models/Tablet.js');
const Dimensions = require(rootPath + '/models/Dimensions.js');
const Desktop = require(rootPath + '/models/Desktop.js');
const Laptop = require(rootPath + '/models/Laptop.js');
const Monitor = require(rootPath + '/models/Monitor.js');

// Forward declaration of the instance reference
let _instance;
/**
 * Repository for product descrptions
 * @author Ekaterina Ruhlin
 * REVIEW: PLEASE MAKE SURE METHOD DESCRIPTIONS ARE CORRECT - Artem
 */
class ProductDescriptionRepository {
  /**
   * Creates the class' unit of work, identity map, tdg and the
   * the inventory item identity map
   */
  constructor() {
    this.uow = new UnitOfWork();
  }
  /**
   * Retrieves current instance of the repository, or if one doesnt
   * exist, instantiates it
   * @return {Object} a reference to the current instance of the repo
   */
  static instance() {
    if (!_instance) {
      _instance = new ProductDescriptionRepository();
    }
    return _instance;
  }
  /**
   * Retrieves products from the identity map. If none are there,
   * retrieves the products from the TDG and adds them to the identity map
   * @param {Object[]} tablets a list of Tablet table rows
   * @return {Object[]} the complete list of product description objects
   */
  mapToTablets(tablets) {
      return tablets.map(
        (tablet) => {
          return new Tablet(
              tablet.comp_id,
              tablet.processor_type,
              tablet.ram_size,
              tablet.number_cpu_cores,
              tablet.harddrive_size,
              tablet.display_size,
              new Dimensions(
                  tablet.dimension_id,
                  tablet.depth,
                  tablet.height,
                  tablet.width),
              tablet.battery_info,
              tablet.os,
              tablet.camera_info,
              tablet.price,
              tablet.weight,
              tablet.brand_name,
              tablet.model_number,
              tablet.type);
      });
  }
  mapToDesktops(desktops) {
      return desktops.map(
        (desktop) => {
          return new Desktop(
              desktop.processor_type,
              desktop.ram_size,
              desktop.number_cpu_cores,
              desktop.harddrive_size,
              new Dimensions(
                  desktop.dimension_id,
                  desktop.depth,
                  desktop.height,
                  desktop.width),
              desktop.price,
              desktop.weight,
              desktop.brand_name,
              desktop.model_number,
              desktop.comp_id,
              desktop.type);
    });
  }
  mapToLaptops(laptops) {
    return laptops.map(
      (laptop) => {
        return new Laptop(
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
            laptop.type);
    });
  }
  mapToMonitors(monitors) {
    return monitors.map(
      (monitor) => {
        return new Monitor(
            monitor.display_size,
            monitor.price,
            monitor.weight,
            monitor.brand_name,
            monitor.model_number,
            monitor.type);
    });
  }
  mapToProducts(productDescriptions) {
    let results = [];
    productDescriptions.forEach(function(description) {
      results.push(new ProductDescription(
        description.price,
        description.weight,
        description.brand_name,
        description.model_number,
        description.type,
        description.is_available
        ));
    });
    return results;
  }
  /**
   * Retrieves all items in the catalog
   * @return {Promise<Object[]>} resolves to the list containing all
   * catalog items
   */
  getAll() {
      return new Promise(
        (resolve, reject) => {
          // Get the items in memory
          let imapProducts = productIMAP.getAll();
          console.log(imapProducts);
          let imapModelNumbers = imapProducts.map(
            (product) => {
              return product.modelNumber;
            }
          );
          // Retrieve the rest of the items from the tables
          let tdgPromises = [
            DesktopsTDG.getAllExcept(imapModelNumbers),
            TabletsTDG.getAllExcept(imapModelNumbers),
            LaptopsTDG.getAllExcept(imapModelNumbers),
            MonitorsTDG.getAllExcept(imapModelNumbers),
          ];
          Promise.all(tdgPromises)
          .then(
            (result) => {
              // Create objects from table rows
              let dbDesktops = this.mapToDesktops(result[0]);
              let dbTablets = this.mapToTablets(result[1]);
              let dbLaptops = this.mapToLaptops(result[2]);
              let dbMonitors = this.mapToMonitors(result[3]);
              let dbProducts = [].concat(dbDesktops, dbTablets,
                                      dbLaptops, dbMonitors);
              // add the newly created products to the identity map
              productIMAP.add(dbProducts);
              // finally, resolve the promise with a combined list of
              // objects from the tables and from the imap
              resolve(imapProducts.concat(dbProducts));
            })
          .catch((err) => reject(err));
        });
  }

  getByModelNumbers(modelNumbers) {
    return new Promise((resolve, reject) => {
      let imapProducts = productIMAP.get(modelNumbers);
      let imapModelNumbers = imapProducts.map((item) => item.model_number);
      // products to retrieve from the tables are those which do not appear
      // in the identity map
      let dbModelNumbers = modelNumbers.filter(
        (number) => {
          return !imapModelNumbers.includes(number);
        });
      // Retrieve the remaining items from the tables
      let tdgPromises = [
        DesktopsTDG.getByModelNumbers(dbModelNumbers),
        TabletsTDG.getByModelNumbers(dbModelNumbers),
        LaptopsTDG.getByModelNumbers(dbModelNumbers),
        MonitorsTDG.getByModelNumbers(dbModelNumbers),
     ];
     Promise.all(tdgPromises).then(
       (result) => {
         // Create objects from data rows
         let dbDesktops = this.mapToDesktops(result[0]);
         let dbTablets = this.mapToTablets(result[1]);
         let dbLaptops = this.mapToLaptops(result[2]);
         let dbMonitors = this.mapToMonitors(result[3]);
         let dbProducts = [].concat(dbDesktops, dbTablets,
                                 dbLaptops, dbMonitors);
         productIMAP.add(dbProducts);
         // finally, resolve the promise with a combined list of
         // objects from the tables and from the imap
         resolve(imapProducts.concat(dbProducts));
       })
       .catch((err) => reject(err));
   });
 }
  /**
   * Retrieves the product description from the identity map given a list of IDs
   * @param {number[]} ids the list of ids of the products to be retrieved
   * @return {Object[]} a list containing the product descriptions
   */
  getByIds(ids) {
    let products = productIMAP.get(ids);
    // REVIEW: This means that if we don't find all of the given ids, we
    // will instead return all the products in the table? I believe this method
    // requires rework - Artem
    if (products.length <= 0 || products.length < ids.length) {
      return productDescTDG.getAll().then((values)=>{
              products = this.mapToProducts(values);
              productIMAP.add(products);
              return products;
            });
    }
  }

  /**
   * Given a list of products, compares to products currently in the inventory,
   * and sorts which are to be added, which to be updated and which to be
   * removed
   * @param {Object[]} products a list of products against which the current
   * product list is to be compared
   * @return {bool}
   */
  save(products) {
    let electronicsToAdd = [];
    let electronicsToUpdate = [];

    let productIds = products.map((p) => p.modelNumber);
    if (productIds.length > 0) {
      let context = [];
    return this.getByIds(productIds).then((values) => {
    let allRecords = productIMAP.getAll();
    for (let i = 0; i < products.length; i++) {
      if (context.findIndex(
        (p) => p.modelNumber == products[i].modelNumber) !== -1
          && electronicsToUpdate.findIndex(
            (e) => e.modelNumber == products[i].modelNumber) === -1) {
            // Case: the product exists in our list of products
            // and hasn't already been processed
            electronicsToUpdate.push(products[i]);
      } else if (allRecords.findIndex(
        (p) => p.modelNumber == products[i].modelNumber) === -1
              && electronicsToAdd.findIndex(
                (e) => e.modelNumber == products[i].modelNumber) === -1) {
                // Case: the product doesn't exist in our list of products
                // and hasn't already been processed
                electronicsToAdd.push(products[i]);
              }
    }
    this.uow.registerNew(electronicsToAdd);
    this.uow.registerDirty(electronicsToUpdate);

    return this.uow.commitAll().then((result) => {
      productIMAP.add(electronicsToAdd);
      return true;
      });
    });
  }
  }
}

module.exports = ProductDescriptionRepository;
