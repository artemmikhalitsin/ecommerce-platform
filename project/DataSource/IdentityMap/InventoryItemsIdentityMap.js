<<<<<<< HEAD
/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
//Singleton class
let _instance;

class InventoryItemsIdentityMap {
    /**
     * Creates an inventory item identity map
     */
    constructor() {
        this.inventoryItems = [];
    }

    static instance() {
      if (!_instance){
        _instance = new InventoryItemsIdentityMap();
      }
      return _instance;
    }

    /**
     * Gets all the items currently stored in the Identity map
     * @return {Object[]} an array containing the items
     */
    getAll(){
        return this.inventoryItems;
    }

    /**
     * Gets a list of items matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of items corresponding to the given model
     * numbers
     */
    get(modelNumbers) {
        //Filters to only items whos model number appears in the given list
        return this.inventoryItems.filter(
          (item) => { return modelNumbers.includes(item.serial_number) }
        );
    }

    /**
     * Adds new objects into the identity map
     * @param {Object[]} newInventoryItems a list containing new items
     */
    add(newInventoryItems) {
      for(var i = 0; i < newInventoryItems.length; i++){
        let item = newInventoryItems[i];
        if(!this.inventoryItems.includes(item.serial_number)){
          this.inventoryItems.push(newInventoryItems[i]);
        }
      }
    }

    /**
     * Deletes items from the identity map by filtering them out
     * @param {string[]} inventoryItemsToRemove a list of alpha-numberical
     * model numbers for which the items are to be removed
     */
    delete(toRemove) {
        this.inventoryItems = this.inventoryItems.filter(
          (item) => { return !toRemove.includes(item.serial_number) }
        )
    }
}
module.exports = InventoryItemsIdentityMap;
=======
'use strict';
// REVIEW: UnitOfWork is never used here, consider removing - Artem
// const UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

/**
 * Identity map of inventory items
 * @author TODO: IF YOU WROTE THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: Please make sure the comments are correct - Artem
 */
class InventoryItemsIdentityMap {
    /**
     * Creates an inventory item identity map
     * Loads all inventory items from database into memory
     */
    constructor() {
        this.rootPath = require('app-root-dir').get();
        let UnitOfWork = require(this.rootPath + '/DataSource/UnitOfWork.js');
        let InventoryItemsTDG = require(this.rootPath
          + '/DataSource/TableDataGateway/InventoryItemsTDG.js');
        this.inventoryTDG = new InventoryItemsTDG();
        let context = this.inventoryTDG.select();
        this.InventoryItems = [];
        Promise.all([context])
        .then((values) => {
            this.InventoryItems = values[0];
        });
    }

    /**
     * Gets all the items currently stored in the Identity map
     * @return {Object[]} an array containing the items
     */
    getAll() {
        console.log('From GetAll ' + this.InventoryItems);
        let result = this.InventoryItems;
        if (this.InventoryItems.length > 0) {
            return result;
        } else {
            let itemsFromTDG = this.inventoryTDG.select();
            Promise.all([itemsFromTDG])
            .then((values) => {
              result = values[0];
            });
            return result;
        }
    }

    /**
     * Gets a list of items matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of items corresponding to the given model
     * numbers
     */
    get(modelNumbers) {
        return this.InventoryItems.filter(function(desc) {
            return modelNumbers.findIndex(
              (x) => x == desc.model_number
            ) > -1;
        });
    }

    // TODO: Is this the same method as above? - Artem
    /**
     * Gets a list of items matching given model numbers
     * @param {string[]} modelNumbers a list of alpha-numberical model numbers
     * @return {Object[]} a list of objects corresponding to the given model
     */
    getByModelNumbers(modelNumbers) {
        let allItems = this.getAll();
        if (allItems != null) {
        let results = allItems.filter(function(item) {
            return modelNumbers.findIndex((x) => x == item.model_number) > -1;
        });
        return results;
        } else return [];
    }

    /**
     * Adds new objects into the identity map
     * @param {Object[]} newInventoryItems a list containing new items
     */
    add(newInventoryItems) {
        for (let i = 0; i < newInventoryItems.length; i++) {
            if (this.InventoryItems.findIndex(
              (p) =>
                p.serial_number == newInventoryItems[i].serial_number) === -1) {
                this.InventoryItems.push(newInventoryItems[i]);
              }
        }
    }

    /**
     * Deletes items from the identity map by filtering them out
     * @param {string[]} inventoryItemsToRemove a list of alpha-numberical
     * model numbers for which the items are to be removed
     */
    delete(inventoryItemsToRemove) {
        this.InventoryItems.filter(function(desc) {
            return inventoryItemsToRemove.findIndex(
              (x) => x == desc.model_number
            ) === -1;
        });
    }
}
module.exports = InventoryItemsIdentityMap;
>>>>>>> 0f1196a47120b144c6edc1ad5ef079dd05edfd9b
