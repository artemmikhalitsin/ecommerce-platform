'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const ProductDescriptionIdentityMap = require(rootPath +
  '/DataSource/IdentityMap/ProductDescriptionsIdentityMap.js');
const ProductDescriptionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
const InventoryItemsIdentityMap = require(rootPath +
  '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');

/**
 * Repository for product descrptions
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
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
    // REVIEW: This creates a new identity map class, which means
    // we potentially have two identity maps in memory?
    // Perhaps consider using singleton pattern instead - Artem
    this.inventoryItemsIM = new InventoryItemsIdentityMap();
  }

  /**
   * Retrieves products from the identity map. If none are there,
   * retrieves the products from the TDG and adds them to the identity map
   * @return {Object[]} the complete list of product description objects
   */
  getAll() {
      let context = this.productDescTDG.select();

      Promise.all([context]).then((values)=>{
        context = values[0];
      });
      this.ProductDescriptionIM.add(context);
    return context;
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
   * @param {numberp[]} ids the list of ids of the products to be retrieved
   * @return {Object[]} a list containing the product descriptions
   */
  getByIds(ids) {
    let products = this.ProductDescriptionIM.get(ids);
    // REVIEW: This means that if we don't find all of the given ids, we
    // will instead return all the products in the table? I believe this method
    // requires rework - Artem
    if (products.length <= 0 || products.length < ids.length) {
      let prodDescFromTDG = this.productDescTDG.select();
            Promise.all([prodDescFromTDG]).then((values)=>{
              products = values[0];
              // REVIEW: This function has a side effect,
              // even though it is an accessor - is this intended functionality?
              // - Artem
              this.ProductDescriptionIM.add(products);
              return products;
            });
    }
    return products;
  }

  /**
   * Given a list of products, compares to products currently in the inventory,
   * and sorts which are to be added, which to be updated and which to be
   * removed
   * @param {Object[]} products a list of products against which the current
   * product list is to be compared
   */
  save(products) {
    let electronicsToAdd = [];
    let electronicsToUpdate = [];
    let electronicsToDelete = [];

    // Extracts the model numbers of given items
    let productIds = products.map((p) => p.model_number);

    if (productIds.length > 0) {
      // Retrieve the products corresponding to given ids
    let context = this.getByIds(productIds);
    let allRecords = this.ProductDescriptionIM.getAll();
    let allInventoryItems = this.inventoryItemsIM.getByModelNumbers(productIds);
    for (let i = 0; i < products.length; i++) {
      if (context.findIndex(
            (p) => p.model_number == products[i].model_number
          ) !== -1 &&
          electronicsToUpdate.findIndex(
            (e) => e.model_number == products[i].model_number
          ) === -1) {
            // Case: the product exists in our list of products
            // and hasn't already been processed
            electronicsToUpdate.push(products[i]);
      } else
      if (allRecords.findIndex(
            (p) => p.model_number == products[i].model_number
          ) === -1 &&
          electronicsToAdd.findIndex(
            (e) => e.model_number == products[i].model_number
          ) === -1) {
            // Case: the product doesn't exist in our list of products
            // and hasn't already been processed
            electronicsToAdd.push(products[i]);
      }
    }
    // REVIEW: Please implement or delete this - Artem
    /* electronicsToDelete = allInventoryItems.filter(function(item){
      console.log(item.model_number);
      return electronicsToUpdate.findIndex(
        e => e.serial_number.forEach(function(ser_number){
          ser_number == item.serial_number
          console.log("serial number " + ser_number);
      })) === -1;
    });*/
    // All other products are to be removed
    electronicsToDelete = allInventoryItems.filter(function(item) {
      let elect = electronicsToUpdate.find(
        (e) => e.model_number == item.model_number
      ).serial_number;
      console.log('Electronic item ' + elect);
      console.log('with serial num ' + item.serial_number);
      return elect.findIndex((i) => i == item.serial_number) === -1;
    });
  }
    this.uow.registerNew(electronicsToAdd);
    this.uow.registerDirty(electronicsToUpdate);
    this.uow.registerDeleted(electronicsToDelete);

    this.uow.commitAll(electronicsToAdd);
    this.ProductDescriptionIM.add(electronicsToAdd);
  }
}

module.exports = ProductDescriptionRepository;
