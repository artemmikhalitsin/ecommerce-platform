'use strict';
const rootPath = require('app-root-dir').get();
const Promise = require('bluebird');
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let ProductDescriptionIdentityMap = require(rootPath
  + '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js');
let ProductDescriptionsTDG = require(rootPath
  + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
let DesktopsTDG = require(rootPath
  + '/DataSource/TableDataGateway/DesktopsTDG.js');
let LaptopsTDG = require(rootPath
  + '/DataSource/TableDataGateway/LaptopsTDG.js');
let MonitorsTDG = require(rootPath
  + '/DataSource/TableDataGateway/MonitorsTDG.js');
let TabletsTDG = require(rootPath
  + '/DataSource/TableDataGateway/TabletsTDG.js');
let ProductDescription = require(rootPath + '/models/ProductDescription.js');

const Tablet = require(rootPath + '/models/Tablet.js');
const Dimensions = require(rootPath + '/models/Dimensions.js');
const Desktop = require(rootPath + '/models/Desktop.js');
const Laptop = require(rootPath + '/models/Laptop.js');
const Monitor = require(rootPath + '/models/Monitor.js');

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
    this.ProductDescriptionIM = new ProductDescriptionIdentityMap();
    this.productDescTDG = new ProductDescriptionsTDG();
    this.DesktopsTDG = new DesktopsTDG();
    this.LaptopsTDG = new LaptopsTDG();
    this.MonitorsTDG = new MonitorsTDG();
    this.TabletsTDG = new TabletsTDG();
  }

  /**
   * Retrieves products from the identity map. If none are there,
   * retrieves the products from the TDG and adds them to the identity map
   * @param {Object[]} tablets
   * @return {Object[]} the complete list of product description objects
   */
  mapToTablets(tablets) {
      let result = [];
      tablets.forEach(function(tablet) {
        result.push(new Tablet(
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
            tablet.type));
      });
    return result;
  }
  mapToDesktops(desktops) {
    let result = [];
    desktops.forEach(function(desktop) {
      let d = new Desktop(
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
      result.push(d);
    });
    return result;
  }
  mapToLaptops(laptops) {
    let result = [];
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
  }
  mapToMonitors(monitors) {
    let result = [];
    monitors.forEach(function(monitor) {
      result.push(new Monitor(
          monitor.display_size,
          monitor.price,
          monitor.weight,
          monitor.brand_name,
          monitor.model_number,
          monitor.type));
    });
    return result;
  }
  mapToProducts(productDescriptions) {
    let results = [];
    productDescriptions.forEach(function(description) {
      results.push(new ProductDescription(
        description.price,
        description.weight,
        description.brand_name,
        description.model_number,
        description.type
        ));
    });
    return results;
  }
  getAll() {
      let context = this.productDescTDG.getAll().then((descriptions) => {
        return products = this.mapToProducts(descriptions);
      });

      Promise.all(context).then((values)=>{
        context = values;
      });
      this.ProductDescriptionIM.add(context);
    return context;
  }
  getAllWithIncludes() {
    let desktops = this.DesktopsTDG.getAll().then((descriptions) => {
      return desktops = this.mapToDesktops(descriptions);
    });
    let laptops = this.LaptopsTDG.getAll().then((descriptions) => {
      return laptops = this.mapToLaptops(descriptions);
    });
    let monitors = this.MonitorsTDG.getAll().then((descriptions) => {
      return monitors = this.mapToMonitors(descriptions);
    });
    let tablets = this.TabletsTDG.getAll().then((descriptions) => {
      return tablets = this.mapToTablets(descriptions);
    });
    let result = [];
    return Promise.all([desktops, laptops, monitors, tablets]).then((values)=>{
      let products = [].concat(...values);
        for (let i = 0; i < products.length; i++) {
          result.push(products[i]);
        }
    return result;
    });
  }
  getByModelNumbers(modelNumbers) {
    let desktops = this.DesktopsTDG.getByModelNumbers(modelNumbers)
      .then((descriptions) => {
      return desktops = this.mapToDesktops(descriptions);
    });
    let laptops = this.LaptopsTDG.getByModelNumbers(modelNumbers)
      .then((descriptions) => {
      return laptops = this.mapToLaptops(descriptions);
    });
    let monitors = this.MonitorsTDG.getByModelNumbers(modelNumbers)
      .then((descriptions) => {
      return monitors = this.mapToMonitors(descriptions);
    });
    let tablets = this.TabletsTDG.getByModelNumbers(modelNumbers)
      .then((descriptions) => {
      return tablets = this.mapToTablets(descriptions);
    });

    let result = [];
    return Promise.all([desktops, laptops, monitors, tablets]).then((values)=>{
      let products = [].concat(...values);
        for (let i = 0; i < products.length; i++) {
          result.push(products[i]);
        }
      return result;
    });
  }
  /**
   * Retrieves the product description from the identity map given a single ID
   * @param {number} id the id of the product description to be retrieved
   * @return {Object[]} a list containing the product description
   * REVIEW: This is esentially a subset of the below method, consider
   * removing - Artem
   */
  getById(id) {
    return this.ProductDescriptionIM.get([id]);
  }

  /**
   * Retrieves the product description from the identity map given a list of IDs
   * @param {number[]} ids the list of ids of the products to be retrieved
   * @return {Object[]} a list containing the product descriptions
   */
  getByIds(ids) {
    let products = this.ProductDescriptionIM.get(ids);
    // REVIEW: This means that if we don't find all of the given ids, we
    // will instead return all the products in the table? I believe this method
    // requires rework - Artem
    if (products.length <= 0 || products.length < ids.length) {
      return this.productDescTDG.getAll().then((values)=>{
              products = this.mapToProducts(values);
              this.ProductDescriptionIM.add(products);
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
      context = values;
    let allRecords = this.ProductDescriptionIM.getAll();
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
      this.ProductDescriptionIM.add(electronicsToAdd);
      return true;
    });
  });
  }
  }
}

module.exports = ProductDescriptionRepository;
