'use strict';
const rootPath = require('app-root-dir').get();
const Promise = require('bluebird');
const DesktopsTDG = require(rootPath
  + '/DataSource/TableDataGateway/DesktopsTDG.js');
const LaptopsTDG = require(rootPath
  + '/DataSource/TableDataGateway/LaptopsTDG.js');
const MonitorsTDG = require(rootPath
  + '/DataSource/TableDataGateway/MonitorsTDG.js');
const TabletsTDG = require(rootPath
  + '/DataSource/TableDataGateway/TabletsTDG.js');
const ProductDescriptionsTDG = require(rootPath
  + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
// Retrieve instance of singleton identity map
const productIMAP = require(rootPath
  + '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js').instance();
// Forward declaration of Unit of Work class, required to resolve an issue
// with circular dependency
let UnitOfWork;

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
    // dependency injection delayed
    UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
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
   * Factory method. Determines what kind of product the specification defines
   * and creates an appropriate domain-level object
   * @param {Object} product specification of a product
   * @return {Tablet|Laptop|Desktop|Monitor} a domain-level object corresponding
   * to the product specification
   */
  static makeProduct(product) {
    switch (product.type) {
      case 'Tablet':
        return ProductDescriptionRepository.makeTablet(product);
        break;
      case 'Laptop':
        return ProductDescriptionRepository.makeLaptop(product);
        break;
      case 'Desktop':
        return ProductDescriptionRepository.makeDesktop(product);
        break;
      case 'Monitor':
        return ProductDescriptionRepository.makeMonitor(product);
        break;
    }
  }
  /**
   * Factory methods that creates tablets
   * @param {Object} tablet specification of a tablet
   * @return {Tablet} a tablet domain-level object
   */
  static makeTablet(tablet) {
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
  }
  /**
   * Factory method that creates desktops
   * @param {Object} desktop the specification of a desktop
   * @return {Desktop} Desktop domain-level object corresponding to the spec
   */
  static makeDesktop(desktop) {
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
  }
  /**
   * Factory method that creates laptops
   * @param {Object} laptop the specification of a laptop
   * @return {Laptop} Laptop domain-level object corresponding to the spec
   */
  static makeLaptop(laptop) {
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
  }
  /**
   * Factory method that creates monitors
   * @param {Object} monitor the specification of a monitor
   * @return {Monitor} Monitor domain-level object corresponding to the spec
   */
  static makeMonitor(monitor) {
    return new Monitor(
        monitor.display_size,
        monitor.price,
        monitor.weight,
        monitor.brand_name,
        monitor.model_number,
        monitor.type);
  }
  mapToTablets(tablets) {
      return tablets.map(
        (tablet) => {
          return ProductDescriptionRepository.makeTablet(tablet);
      });
  }
  mapToDesktops(desktops) {
      return desktops.map(
        (desktop) => {
          return ProductDescriptionRepository.makeDesktop(desktop);
    }, this);
  }
  mapToLaptops(laptops) {
    return laptops.map(
      (laptop) => {
        return ProductDescriptionRepository.makeLaptop(laptop);
    }, this);
  }
  mapToMonitors(monitors) {
    return monitors.map(
      (monitor) => {
        return ProductDescriptionRepository.makeMonitor(monitor);
    }, this);
  }
  /**
   * Given a specification creates a product and registers it to the storage
   * @param {Object} object a product specification
   */
  makeNew(object) {
    let product = this.makeProduct(object);
    if (productIMAP.get(product.modelNumber)) {
      throw new Error(`Cannot create new product with model number
        ${product.modelNumber}. A product with the same model number
        already exists`);
    } else {
      productIMAP.add(product);
      this.uow.registerNew(product);
    }
  }
  /**
   * Performs the insertion into the database
   * @param {Product} product the product to be inserted
   * @return {Promise<boolean>} resolve to true if successful
   */
  insert(product) {
    return new Promise((resolve, reject) => {
      // TODO: Implement this with the tdg call
      console.log(`Inserting ${JSON.stringify(product)} into database`);
      resolve(true);
    });
  }
  /**
   * Given a specification creates a product and updates an existing product
   * to the new spec in storage
   * @param {Object} object a product specification
   */
  set(object) {
    let product = this.makeProduct(object);
    let imapProduct = productIMAP.get(product.modelNumber);
    if (!imapProduct) {
      throw new Error(`Cannot update product with model number
        ${product.modelNumber}. The product must first be loaded into memory
        before it can be updated.`);
    } else {
      // Store a clean copy of the product, in case of rollback
      this.uow.registerClean(imapProduct.clone());
      productIMAP.update(product);
      this.uow.registerDirty(product);
    }
  }
  update(product) {
    return new Promise((resolve, reject) => {
      // TODO: Stuff that has to do with the tdg
      console.log(`Updating ${JSON.stringify(product)} in database`);
      resolve(true);
    });
  }
  /**
   * Given a specification, deletes the specified object from storage
   * @param {Object} object a product specification
   */
  erase(object) {
    let product = this.makeProduct(object);
    let imapProduct = productIMAP.get(product.modelNumber);
    if (!imapProduct) {
      throw new Error(`Cannot delete product with model number
        ${product.modelNumber}. The product must first be loaded into memory
        before it can be deleted`);
    } else {
      productIMAP.delete(product.modelNumber);
      this.uow.registerDeleted(product);
    }
  }
  delete(product) {
    return new Promise((resolve, reject) => {
      console.log(`Deleting ${JSON.stringify(product)} from database`);
      productIMAP.delete([product.modelNumber]);
      resolve(true);
    });
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
              dbProducts.forEach((product) => productIMAP.add(product));
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
      if (!imapProducts) {
        imapProducts = [];
      }
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
      console.log('hello');

    return this.getByModelNumbers(productIds).then((values) => {
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
