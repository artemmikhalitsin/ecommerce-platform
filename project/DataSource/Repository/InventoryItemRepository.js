'use strict';
const rootPath = require('app-root-dir').get();
const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
const InventoryItemsIdentityMap = require(rootPath +
  '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');
const InventoryItemsTDG = require(rootPath +
  '/DataSource/TableDataGateway/InventoryItemsTDG.js');

/**
 * Repository for Inventory Items
 * @author Ekaterina Ruhlin
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */
class InventoryItemRepository {
  /**
   * Constructor initializes the unit of work, identity map and the tdg
   */
  constructor() {
    this.uow = new UnitOfWork();
    this.inventoryItemsIM = new InventoryItemsIdentityMap();
    this.inventoryTDG = new InventoryItemsTDG();
  }
  /**
   * Retrieves items from the identity map. If none are there,
   * retrieves the items from the TDG and adds them to the identity map
   * @return {Object[]} the complete list of inventory item objects
   */
  getAll() {
    let context = this.inventoryItemsIM.getAll();
    if (context.length <= 0) {
      context = this.inventoryTDG.select();

      Promise.all([context]).then(
        (values) => {
          context = values[0];
        }
      );
      this.inventoryItemsIM.add(context);
    }
    return context;
  }
  getByModelNumbers(modelNumbers) {
    let inventory = this.inventoryTDG.getByModelNumbers(modelNumbers);
    console.log('The models numbers passed' + JSON.stringify(modelNumbers));
    let result = [];
    return Promise.all([inventory]).then((values) => {
          result = values[0];
          console.log('the inventory items repo gives: '
                      + JSON.stringify(result));

    return result;
        }).catch((err) => {
console.log(err);
});
  }
  /**
   * Retrieves all items from the database table
   * @param {string} args TODO: Not sure what this argument is doing here??
   * @return {Promise<Object[]>} promise which resolves to the list of inventory
   * items in the database
   */
  get(args) {
    return database('inventoryItem').select('*');
  }

  /**
   * Given a list of ids, retrieves items from the identity map corresponding
   * to the given ids
   * @param {number[]} ids a list of ids (REVIEW: or is it model numbers?)
   * in the table for which the inventoryItemsIM item rows should be retrieved
   * @return {Object[]} the list of inventory items in the system
   */
  getByIds(ids) {
    let items = this.inventoryItemsIM.get(ids);
    // REVIEW: This means that if we don't find all of the given ids, we
    // will instead return all the items in the table? I believe this method
    // requires rework - Artem
    if (items.length <= 0 || items.length < ids.length) {
      // REVIEW: Looks like this duplicates some functionality from getAll
      // Maybe this should be abstracted into a function? - Artem
      let itemsFromTDG = this.inventoryTDG.select();
          Promise.all([itemsFromTDG]).then(
            (values) => {
              items = values[0];
            }
          );
          // REVIEW: This function has a side effect, even though it is a get
          // function - is this intended functionality? - Artem
          this.inventoryItemsIM.add(items);
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
    let electronicsToAdd = [];
    let electronicsToDelete = [];

    // Extracts the model numbers of given items
    let modelNumbers = items.map((p) => p.model_number);

    if (modelNumbers.length > 0) {
      // Retrieve the items corresponding to given ids
      let allInventoryItems = this.inventoryItemsIM
                          .getByModelNumbers(modelNumbers);

      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items[i].serial_number.length; j++) {
          if (allInventoryItems.findIndex(
            (p) => p.serial_number == items[i].serial_number[j]) === -1
            && electronicsToAdd.findIndex(
              (e) => e.serial_number == items[i].serial_number[j]
              && e.model_number == items[i].model_number) === -1) {
              // Case: item is not in our inventory
              // and hasn't already been processed
              electronicsToAdd.push({'serial_number': items[i].serial_number[j],
                                      'model_number': items[i].model_number});
            }
        }
      }
      // Any item in inventory that don't appear in new list are to be removed
      electronicsToDelete = allInventoryItems.filter(function(item) {
        console.log(item.model_number);
       items.forEach(function(element) {
         return element.serial_number.findIndex((e) =>
            e == item.serial_number) === -1;
        });
      });
    }
    // Process the new tasks
    this.uow.registerNewItem(electronicsToAdd);
    this.uow.registerDeletedItem(electronicsToDelete);

    this.uow.commitAll();
    this.inventoryItemsIM.add(electronicsToAdd);
  }
}
module.exports = InventoryItemRepository;
