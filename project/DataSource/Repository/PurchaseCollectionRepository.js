'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const inventoryItemsIM = require(rootPath +
  '/DataSource/IdentityMap/InventoryItemsIdentityMap.js').instance();
const purchaseCollectionTDG = require(rootPath +
  '/DataSource/TableDataGateway/PurchaseCollectionTDG.js');

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
  }
  /**
   * Retrieves items from the identity map. If none are there,
   * retrieves the items from the TDG and adds them to the identity map
   * @return {Object[]} the complete list of inventory item objects
   */
  getAll() {
    let context = inventoryItemsIM.getAll();
    if (context.length <= 0) {
      context = inventoryTDG.select();

      Promise.all([context]).then(
        (values) => {
          context = values[0];
        }
      );
      inventoryItemsIM.add(context);
    }
    return context;
  }

  /**
   * Retrieves all items from the database table
   * @param {string} args TODO: Not sure what this argument is doing here??
   * @return {Promise<Object[]>} promise which resolves to the list of inventory
   * items in the database
   */
   get(user) {
     return purchaseCollectionTDG.select(user);
   }

  /**
   * Given a list of ids, retrieves items from the identity map corresponding
   * to the given ids
   * @param {number[]} ids a list of ids (REVIEW: or is it model numbers?)
   * in the table for which the inventoryItemsIM item rows should be retrieved
   * @return {Object[]} the list of inventory items in the system
   */
  getByIds(ids) {
    let items = inventoryItemsIM.get(ids);
    // REVIEW: This means that if we don't find all of the given ids, we
    // will instead return all the items in the table? I believe this method
    // requires rework - Artem
    if (items.length <= 0 || items.length < ids.length) {
      // REVIEW: Looks like this duplicates some functionality from getAll
      // Maybe this should be abstracted into a function? - Artem
      let itemsFromTDG = inventoryTDG.select();
          Promise.all([itemsFromTDG]).then(
            (values) => {
              items = values[0];
            }
          );
          // REVIEW: This function has a side effect, even though it is a get
          // function - is this intended functionality? - Artem
          inventoryItemsIM.add(items);
    }
    return items;
  }

  /**
   * Retrieves inventory items from the Unit of Work
   * @return {Promise<Object[]>} promise which resolvesto a list of
   * inventory objects
   * combined with their item descriptions
   */
  getAllInventoryItems() {
    return this.uow.getAllInventoryItems();
  }

  /**
   * Given a list of items, compares to items currently in the inventory, and
   * sorts which are to be added, which to be updated and which to be removed
   * @param {Object[]} items a list of items against which the currently
   * inventory is to be compared
   */
  save(items) {
    // var electronicsToAdd = []
    let electronicsToDelete = items;
    let electronicsToAdd = items;

    this.uow.registerDeletedItem(electronicsToDelete);
    this.uow.registerNewPurchase(electronicsToAdd);
    this.uow.commitAll();
    // inventoryItemsIM.add(electronicsToAdd);
  }

  returnItems(items) {
    let electronicsToDelete = items;
    let electronicsToAdd = items;

    this.uow.registerReturn(electronicsToDelete);
    this.uow.registerNewItem(electronicsToAdd);
    this.uow.commitAll();
    inventoryItemsIM.add(electronicsToAdd);
  }
}
module.exports = PurchaseCollectionRepo;
