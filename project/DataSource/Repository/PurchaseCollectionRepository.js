'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const InventoryItemsIdentityMap = require(rootPath +
  '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');
const PurchaseIdentityMap = require(rootPath +
  '/DataSource/IdentityMap/PurchaseIdentityMap.js');
const PurchaseCollectionTDG = require(rootPath +
  '/DataSource/TableDataGateway/PurchaseCollectionTDG.js');
const InventoryItem = require(rootPath + '/models/InventoryItem.js');
const Purchase = require(rootPath + '/models/Purchase.js');


/**
 * Repository for Inventory Items
 * @author Michael Li
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */
class PurchaseCollectionRepo {
  /**
   * Constructor initializes the unit of work, identity map and the tdg
   */
  constructor() {
    this.uow = new UnitOfWork();
    this.inventoryItemsIM = new InventoryItemsIdentityMap();
    this.purchaseItemsIM = new PurchaseIdentityMap();
    this.purchaseCollectionTDG = new PurchaseCollectionTDG();
  }

  /**
   * Retrieves all items related to a user's purchase collection
   * from the database table
   * @param {string} user A user with an active session
   * @return {Promise<Object[]>} promise which resolves to the list of inventory
   * items in the database
   */
   get(user) {
     return this.purchaseCollectionTDG.select(user);
   }


  /**
   * Adds to client's purchase collection, deletes from inventory
   * @param {Object[]} items a list of items to be purchased
   *
   */
  save(items) {
    // var electronicsToAdd = []
    let electronicsToDelete = items;
    let electronicsToAdd = items;
    this.uow.registerDeletedItem(electronicsToDelete);
    this.uow.registerNewPurchase(electronicsToAdd);
    this.uow.commitAll();
    electronicsToDelete = items.map(
      (item) => {
        return new InventoryItem(item.id, item.serialNumber,
                                 item.modelNumber, null);
      }
    );
    electronicsToAdd = items.map(
      (item) => {
        return new Purchase(item.purchaseId, item.serialNumber,
                                 item.modelNumber);
      }
    );
    this.inventoryItemsIM.delete(electronicsToDelete);
    this.purchaseItemsIM.add(electronicsToAdd);
  }

  /**
   * Removes from client's purchase collection, adds to inventory
   * @param {Object[]} items a list of items to be returned
   *
   */
  returnItems(items) {
    let electronicsToAdd = items.map(
      (item) => {
        return new InventoryItem(item.id, item.serialNumber,
                                 item.modelNumber, null);
      }
    );
    let electronicsToDelete = items.map(
      (item) => {
        return new Purchase(item.purchaseId, item.serialNumber,
                                 item.modelNumber);
      }
    );
    this.uow.registerReturn(electronicsToDelete);
    this.uow.registerNewItem(electronicsToAdd);
    this.uow.commitAll();
    this.inventoryItemsIM.add(electronicsToAdd);
    this.purchaseItemsIM.delete(electronicsToDelete);
  }
}
module.exports = PurchaseCollectionRepo;
