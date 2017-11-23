/* eslint-disable */
// Eslint disabled for this file only until it is documented

// REVIEW: I haven't docced this file yet cause it's a little overwhelming
// Only fixed some formatting - Artem
'use strict';
const Promise = require('bluebird');
const rootPath = require('app-root-dir').get();
const environment = process.env.NODE_ENV || 'development';
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

const productDescTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
const inventoryItemsTDG = require(rootPath +
  '/DataSource/TableDataGateway/InventoryItemsTDG.js');
const computersTDG = require(rootPath +
  '/DataSource/TableDataGateway/ComputersTDG.js');
const desktopsTDG = require(rootPath +
  '/DataSource/TableDataGateway/DesktopsTDG.js');
const dimensionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/DimensionsTDG.js');
const laptopsTDG = require(rootPath +
  '/DataSource/TableDataGateway/LaptopsTDG.js');
const monitorsTDG = require(rootPath +
  '/DataSource/TableDataGateway/MonitorsTDG.js');
const tabletsTDG = require(rootPath +
  '/DataSource/TableDataGateway/TabletsTDG.js');
const purchaseTDG = require(rootPath +
  '/DataSource/TableDataGateway/PurchaseCollectionTDG.js');
const TransactionLogTDG = require(rootPath +
  '/DataSource/TableDataGateway/TransactionLogTDG.js');
/**
 * Unit of Work implementation
 * @author Ekaterina Ruhlin
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class UnitOfWork {
  /**
   * Constructor initiates all table data gateways
   */
  constructor() {
    this.dirtyElements = [];
    this.newElements = [];
    this.deletedElements = [];
    this.newInventoryItems = [];
    this.deletedInventoryItems = [];
    this.newPurchases = [];
    this.deletedPurchases = [];
    this.transactionItems = [];
  }
  registerNew(object) {
    this.newElements = [];
    this.newElements.push(object);
  }
  registerNewPurchase(object) {
    this.newPurchases = [];
    this.newPurchases.push(object);
    this.newInventoryItems =[];
    this.deletePurchases = [];
  }
  registerReturn(object){
    this.deletedPurchases = [];
    this.deletedPurchases.push(object);
    this.deletedInventoryItems = [];
    this.newPurchases = [];
  }
  registerDirty(object) {
    this.dirtyElements = [];
    this.dirtyElements.push(object);
  }
  registerDeleted(object) {
    this.deletedElements = [];
    this.deletedElements.push(object);
  }
  registerNewItem(object) {
    this.newInventoryItems = [];
    this.newInventoryItems.push(object);
  }
  registerDeletedItem(object) {
    this.deletedInventoryItems = [];
    this.deletedInventoryItems.push(object);
  }
  registerTransaction(object){
    this.transactionItems = [];
    this.transactionItems.push(object);
  }
  commitAll() {

    let electronics = [];
    return connection.transaction((trx) => {
      /*
      console.log('Electronics new Elements: ');
      console.log(this.newElements[0]);
      console.log('Electronics to update ');
      console.log(this.dirtyElements[0]);
      console.log("Inventory items to add");
      console.log(this.newInventoryItems[0]);
      console.log("Inventory items to delete: ");
      console.log(this.deletedInventoryItems[0]);
      console.log("Purchase to add:");;
      console.log(this.newPurchases[0]);
      console.log("Purchase to delete:");
      console.log(this.deletePurchases[0]);
      */

      let deletedItems;
      //delete items
      if(this.deletedInventoryItems[0] != null && this.deletedInventoryItems[0].length > 0){
       deletedItems = Promise.each(this.deletedInventoryItems[0], (electronic) => {
        return inventoryItemsTDG.delete(electronic).transacting(trx).then(() => {
              console.log('deleted inventory item');
        })
      });}
      //end of delete
      //add items
      let newItems;
      if(this.newInventoryItems[0] != null && this.newInventoryItems[0].length > 0){
        newItems = Promise.each(this.newInventoryItems[0], (electronic) => {
          return inventoryItemsTDG.add(electronic.serial_number, electronic.model_number).transacting(trx).then(() => {
               console.log('added inventory item');
         })
       });}

       //add purchases
       let purchasedItems;
       if (this.newPurchases[0] != null && this.newPurchases[0].length > 0) {
         purchasedItems = Promise.each(this.newPurchases[0], (electronic) => {
           return purchaseTDG.add(electronic.client, electronic.serial_number, electronic.model_number, electronic.purchase_Id)
                  .transacting(trx).then(() => {
                    console.log("Added purchased items");
                  })
         })
       }

       //remove purchase
       let deletedPurchase;
       if(this.deletedPurchases[0] != null && this.deletedPurchases[0].length > 0){
        deletedPurchases = Promise.each(this.deletedPurchases[0], (electronic) => {
         return purchaseTDG.delete(electronic).transacting(trx).then(() => {
               console.log('deleted purchase item');
         })
       });}

       //add(log) transaction
       let addedTransaction;
       if(this.transactionItems[0] != null && this.transactionItems[0].length > 0){
        addedTransaction = Promise.each(this.transactionItems[0], (transaction) => {
         return this.transactionTDG.add(transaction).transacting(trx).then(() => {
               console.log('added transaction');
         })
       });}
      //update products
      let updateditems;
      if(this.dirtyElements[0] && this.dirtyElements[0].length > 0){

      updateditems = Promise.each(this.dirtyElements[0], (electronic) => {
        return productDescTDG.update(electronic).transacting(trx).then(
          (model_number) => {
             switch (electronic.type) {
               case 'Desktop':
                 {
                   return dimensionsTDG
                    .update(electronic.dimensions)
                    .transacting(trx)
                    .then(
                      (dimensionsId) => {
                        return computersTDG
                          .update(electronic)
                          .transacting(trx)
                          .then(
                            (compId) => {
                              return desktopsTDG
                                .update(compId, dimensionsId, electronic)
                                .transacting(trx);
                          });
                    });
                 };
                 break;
               case 'Laptop':
                 {
                   return computersTDG
                    .update(electronic)
                    .transacting(trx)
                    .then(
                      (compId) => {
                        return laptopsTDG
                          .update(compId, electronic)
                          .transacting(trx);
                    });
                 };
                 break;
               case 'Tablet':
                 {
                   return dimensionsTDG
                    .update(electronic.dimensions)
                    .transacting(trx)
                    .then(
                      (dimensionsId) => {
                        return computersTDG
                          .update(electronic)
                          .transacting(trx)
                          .then(
                            (compId) => {
                              return tabletsTDG
                                .update(compId, dimensionsId, electronic)
                                .transacting(trx);
                          });
                    });
                 };
                 break;
               case 'Monitor':
                 {
                   return monitorsTDG.update(electronic).transacting(trx);
                 };
                 break;
             }
       });
     });
      }
      // end of update

      //add products
      let addeditems;
      if(this.newElements[0] != null){
      addeditems = Promise.each(this.newElements[0], (electronic) => {
        return productDescTDG
          .add(electronic)
          .transacting(trx)
          .then(
            (model_number) => {
          /*Promise.each(electronic.serial_number, (item_serial_number) => {
            return inventoryItemsTDG.add(item_serial_number, electronic.model_number).transacting(trx).then((id) => {
              console.log('added inventory item ');
            });
          });*/
              switch (electronic.type) {
                case 'Desktop':
                  {
                    return dimensionsTDG
                      .add(electronic.dimensions)
                      .transacting(trx)
                      .then(
                        (dimensionsId) => {
                          return computersTDG
                            .add(electronic)
                            .transacting(trx)
                            .then(
                              (compId) => {
                                return desktopsTDG
                                  .add(compId, dimensionsId, electronic)
                                  .transacting(trx);
                            });
                      });
                  };
                  break;
                case 'Laptop':
                  {
                    return computersTDG
                      .add(electronic)
                      .transacting(trx)
                      .then(
                        (compId) => {
                          return laptopsTDG
                            .add(compId, electronic)
                            .transacting(trx);
                        });
                  };
                  break;
                case 'Tablet':
                  {
                    return dimensionsTDG
                      .add(electronic.dimensions)
                      .transacting(trx)
                      .then(
                        (dimensionsId) => {
                          return computersTDG
                            .add(electronic)
                            .transacting(trx)
                            .then(
                              (compId) => {
                                return tabletsTDG
                                  .add(compId, dimensionsId, electronic)
                                  .transacting(trx);
                              });
                        });
                  };
                  break;
                case 'Monitor':
                  {
                    return monitorsTDG.add(electronic).transacting(trx);
                  };
                  break;
              }
        });
      }
      //add
      );}
      Promise.props([newItems, purchasedItems, deletedItems, updateditems, addeditems, addedTransaction, deletedPurchase])
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }

  // TODO: DELETE
 /* getAllInventoryItems() {
    return new Promise((resolve, reject) => {
      let desktops = this.getAllDesktops();
      let laptops = this.getAllLaptops();
      let tablets = this.getAllTablets();
      let monitors = this.getAllMonitors();

      Promise.all([laptops, desktops, tablets, monitors])
      .then(((results) => {
        let products = [].concat(...results); //[].concat.apply([], results); //

        // retrieve the model numbers present in the products
        let model_numbers = this.getAllModelNumbers(products);

        // getting the serial numbers associated with the model numbers
        connection('Inventory')
        .select('*')
        .havingIn('model_number', model_numbers)
        .then((serials) => {
            products = products.map((product) => {
              let serial_numbers = serials.filter((serial) => {
                return serial.model_number === product.model_number;
              })
              .map((serial) => {
                return serial.serial_number;
              });

              product.serial_numbers = serial_numbers;
              return product;
            });

            resolve(products);
          }
        );
      }))
      .catch((err) => reject(err));
    });
  }*/

  // this function is getting all the model numbers from all the products
  getAllModelNumbers(products) {
    return products.map((obj) => {
      return obj.model_number;
    });
  }

  // this function already exists in the ProductDescriptionsTDG so it should be removed
  getAllProductsDescription() {
    return connection('ProductDescription').select('*');
  }

  // the following getter function will need to be moved to their respective TDGs
  getAllDesktops() {
    return connection('ProductDescription')
               .innerJoin('Desktop', 'Desktop.model_number',
                          'ProductDescription.model_number')
               .innerJoin('Computer', 'Desktop.comp_id', 'Computer.comp_id')
               .innerJoin('Dimensions', 'Desktop.dimension_id',
                          'Dimensions.dimension_id')
               .select('ProductDescription.model_number', 'brand_name', 'price',
                       'type', 'weight', 'is_available', 'processor_type',
                       'ram_size', 'number_cpu_cores', 'harddrive_size',
                       'depth', 'height', 'width');
  }

  getAllLaptops() {
    return connection('ProductDescription')
               .innerJoin('Laptop', 'Laptop.model_number',
                          'ProductDescription.model_number')
               .innerJoin('Computer', 'Laptop.comp_id', 'Computer.comp_id')
               .select('ProductDescription.model_number', 'brand_name', 'price',
                       'type', 'weight', 'is_available', 'processor_type',
                       'ram_size', 'number_cpu_cores', 'harddrive_size', 'os',
                       'touch_screen', 'camera', 'display_size',
                       'battery_info');
  }

  getAllTablets() {
    return connection('ProductDescription')
               .innerJoin('Tablet', 'Tablet.model_number',
                          'ProductDescription.model_number')
               .innerJoin('Computer', 'Tablet.comp_id', 'Computer.comp_id')
               .innerJoin('Dimensions', 'Tablet.dimension_id',
                          'Dimensions.dimension_id')
               .select('ProductDescription.model_number', 'brand_name', 'price',
                       'type', 'weight', 'is_available', 'processor_type',
                       'ram_size', 'number_cpu_cores', 'harddrive_size',
                       'display_size', 'battery_info', 'camera_info',
                       'os', 'depth', 'height', 'width');
  }

  getAllMonitors() {
    return connection('ProductDescription')
               .innerJoin('Monitor', 'Monitor.model_number',
                          'ProductDescription.model_number')
               .select('ProductDescription.model_number', 'brand_name', 'price',
                       'type', 'weight', 'is_available', 'display_size');
  }

  // NOTE if we are not using this function then it should be removed. If we gonna use it later then ignore this comment
  compareWithContext(productDescriptions, electronics) {
    let electronicsToAdd = [];
    let electronicsToUpdate = [];
    let electronicsToDelete = [];
    for (var i = 0; i < productDescriptions.length; i++) {
      for (var j = 0; j < electronics.length; j++) {
        if (productDescriptions[i].model_number == electronics[j].model_number && electronicsToUpdate.findIndex((x) => x.model_number == electronics[j].model_number) === -1) {
          electronicsToUpdate.push(electronics[j]);
        }
      }
    }

    for (var i = 0; i < productDescriptions.length; i++) {
      if (electronicsToUpdate.findIndex((x) => x.model_number == productDescriptions[i].model_number) === -1 && electronicsToDelete.findIndex((x) => x.model_number == productDescriptions[i].model_number) === -1) {
        electronicsToDelete.push(productDescriptions[i]);
      }
    }
    for (var i = 0; i < electronics.length; i++) {
      if (productDescriptions.findIndex((x) => x.model_number == electronics[i].model_number) === -1 && electronicsToAdd.findIndex((x) => x.model_number == electronics[i].model_number) === -1) {
        electronicsToAdd.push(electronics[i]);
      }
    }
    return [electronicsToAdd, electronicsToUpdate, electronicsToDelete];
  }
}
module.exports = UnitOfWork;
