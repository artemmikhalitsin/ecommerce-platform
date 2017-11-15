'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rootPath = require('app-root-dir').get();
var UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
var InventoryItemsIdentityMap = require(rootPath + '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');
var InventoryItemsTDG = require(rootPath + '/DataSource/TableDataGateway/InventoryItemsTDG.js');

/**
 * Repository for Inventory Items
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT
 */

var InventoryItemRepository = function () {
  /**
   * Constructor initializes the unit of work, identity map and the tdg
   */
  function InventoryItemRepository() {
    _classCallCheck(this, InventoryItemRepository);

    this.uow = new UnitOfWork();
    this.inventoryItemsIM = new InventoryItemsIdentityMap();
    this.inventoryTDG = new InventoryItemsTDG();
  }
  /**
   * Retrieves items from the identity map. If none are there,
   * retrieves the items from the TDG and adds them to the identity map
   * @return {Object[]} the complete list of inventory item objects
   */


  _createClass(InventoryItemRepository, [{
    key: 'getAll',
    value: function getAll() {
      var context = this.inventoryItemsIM.getAll();
      if (context.length <= 0) {
        context = this.inventoryTDG.select();

        Promise.all([context]).then(function (values) {
          context = values[0];
        });
        this.inventoryItemsIM.add(context);
      }
      return context;
    }

    /**
     * Retrieves all items from the database table
     * @param {string} args TODO: Not sure what this argument is doing here??
     * @return {Promise<Object[]>} promise which resolves to the list of inventory
     * items in the database
     */

  }, {
    key: 'get',
    value: function get(args) {
      return database('inventoryItem').select('*');
    }

    /**
     * Given a list of ids, retrieves items from the identity map corresponding
     * to the given ids
     * @param {number[]} ids a list of ids (REVIEW: or is it model numbers?)
     * in the table for which the inventoryItemsIM item rows should be retrieved
     * @return {Object[]} the list of inventory items in the system
     */

  }, {
    key: 'getByIds',
    value: function getByIds(ids) {
      var items = this.inventoryItemsIM.get(ids);
      // REVIEW: This means that if we don't find all of the given ids, we
      // will instead return all the items in the table? I believe this method
      // requires rework - Artem
      if (items.length <= 0 || items.length < ids.length) {
        // REVIEW: Looks like this duplicates some functionality from getAll
        // Maybe this should be abstracted into a function? - Artem
        var itemsFromTDG = this.inventoryTDG.select();
        Promise.all([itemsFromTDG]).then(function (values) {
          items = values[0];
        });
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

  }, {
    key: 'getAllInventoryItems',
    value: function getAllInventoryItems() {
      return this.uow.getAllInventoryItems();
    }
    /**
     * Given a list of items, compares to items currently in the inventory, and
     * sorts which are to be added, which to be updated and which to be removed
     * @param {Object[]} items a list of items against which the currently
     * inventory is to be compared
     */

  }, {
    key: 'save',
    value: function save(items) {
      var electronicsToAdd = [];
      var electronicsToDelete = [];

      // Extracts the model numbers of given items
      var model_numbers = items.map(function (p) {
        return p.model_number;
      });

      if (model_numbers.length > 0) {
        // Retrieve the items corresponding to given ids
        var allInventoryItems = this.inventoryItemsIM.getByModelNumbers(model_numbers);

        for (var i = 0; i < items.length; i++) {
          for (var j = 0; j < items[i].serial_number.length; j++) {
            if (allInventoryItems.findIndex(function (p) {
              return p.serial_number == items[i].serial_number[j];
            }) === -1 && electronicsToAdd.findIndex(function (e) {
              return e.serial_number == items[i].serial_number[j] && e.model_number == items[i].model_number;
            }) === -1) {
              // Case: item is not in our inventory
              // and hasn't already been processed
              electronicsToAdd.push({ 'serial_number': items[i].serial_number[j], 'model_number': items[i].model_number });
            }
          }
        }
        // Any item in inventory that don't appear in new list are to be removed
        electronicsToDelete = allInventoryItems.filter(function (item) {
          console.log(item.model_number);
          items.forEach(function (element) {
            return element.serial_number.findIndex(function (e) {
              return e == item.serial_number;
            }) === -1;
          });
        });
      }
      // Process the new tasks
      this.uow.registerNewItem(electronicsToAdd);
      this.uow.registerDeletedItem(electronicsToDelete);

      this.uow.commitAll();
      this.inventoryItemsIM.add(electronicsToAdd);
    }
  }]);

  return InventoryItemRepository;
}();

module.exports = InventoryItemRepository;