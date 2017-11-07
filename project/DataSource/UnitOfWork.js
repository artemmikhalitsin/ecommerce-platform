/* eslint-disable */
// Eslint disabled for this file only until it is documented

// REVIEW: I haven't docced this file yet cause it's a little overwhelming
// Only fixed some formatting - Artem

const Promise = require('bluebird');
const rootPath = require('app-root-dir').get();
const environment = process.env.NODE_ENV || 'development';
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);

const ProductDescriptionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
const InventoryItemsTDG = require(rootPath +
  '/DataSource/TableDataGateway/InventoryItemsTDG.js');
const ComputersTDG = require(rootPath +
  '/DataSource/TableDataGateway/ComputersTDG.js');
const DesktopsTDG = require(rootPath +
  '/DataSource/TableDataGateway/DesktopsTDG.js');
const DimensionsTDG = require(rootPath +
  '/DataSource/TableDataGateway/DimensionsTDG.js');
const LaptopsTDG = require(rootPath +
  '/DataSource/TableDataGateway/LaptopsTDG.js');
const MonitorsTDG = require(rootPath +
  '/DataSource/TableDataGateway/MonitorsTDG.js');
const TabletsTDG = require(rootPath +
  '/DataSource/TableDataGateway/TabletsTDG.js');

/**
 * Unit of Work implementation
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class UnitOfWork {
  /**
   * Constructor initiates all table data gateways
   */
  // REVIEW: TDGS have no instance variables - do we need to instantiate them? - Artem
  constructor() {
    this.productDescTDG = new ProductDescriptionsTDG();
    this.inventoryItemsTDG = new InventoryItemsTDG();
    this.computersTDG = new ComputersTDG();
    this.desktopsTDG = new DesktopsTDG();
    this.dimensionsTDG = new DimensionsTDG();
    this.laptopsTDG = new LaptopsTDG();
    this.monitorsTDG = new MonitorsTDG();
    this.tabletsTDG = new TabletsTDG();

    this.dirtyElements = [];
    this.newElements = [];
    this.deletedElements = [];
  }
  registerNew(object) {
    this.newElements = [];
    this.newElements.push(object);
  }
  registerDirty(object) {
    this.dirtyElements = [];
    this.dirtyElements.push(object);
  }
  registerDeleted(object) {
    this.deletedElements = [];
    this.deletedElements.push(object);
  }
  commitAll(object) {
    let electronics = [];
    return connection.transaction((trx) => {
      console.log('Electronics new Elements: ');
      console.log(this.newElements[0]);
      console.log('Electronics to update ');
      console.log(this.dirtyElements[0]);
      console.log('Electronics to delete: ');
      console.log(this.deletedElements[0]);
      let deletedItems;
      // delete items
      if (this.deletedElements[0].length > 0) {
       deletedItems = Promise.each(this.deletedElements[0], (electronic) => {
        return this.inventoryItemsTDG.delete(electronic).transacting(trx).then(
          () => {
              console.log('deleted inventory item');
            }
        );
      });
}
      // end of delete

      // update
      let updateditems;
      if (this.dirtyElements[0].length > 0) {
      updateditems = Promise.each(this.dirtyElements[0], (electronic) => {
        return this.productDescTDG.update(electronic).transacting(trx).then(
          (model_number) => {
             switch (electronic.type) {
               case 'Desktop':
                 {
                   return this.dimensionsTDG
                    .update(electronic.dimension)
                    .transacting(trx)
                    .then(
                      (dimensionsId) => {
                        return this.computersTDG
                        .update(electronic)
                        .transacting(trx)
                        .then((compId) => {
                          return this.desktopsTDG
                          .update(compId, dimensionsId, electronic)
                          .transacting(trx);
                        });
                      });
                 };
                 break;
               case 'Laptop':
                 {
                   return this.computersTDG
                   .update(electronic)
                   .transacting(trx)
                   .then(
                     (compId) => {
                       return this.laptopsTDG
                       .update(compId, electronic)
                       .transacting(trx);
                   });
                 };
                 break;
               case 'Tablet':
                 {
                   return this.dimensionsTDG
                   .update(electronic.dimension)
                   .transacting(trx)
                   .then(
                     (dimensionsId) => {
                       return this.computersTDG
                       .update(electronic)
                       .transacting(trx)
                       .then(
                         (compId) => {
                           return this.tabletsTDG
                           .update(compId, dimensionsId, electronic)
                           .transacting(trx);
                     });
                   });
                 };
                 break;
               case 'Monitor':
                 {
                   return this.monitorsTDG.update(electronic).transacting(trx);
                 };
                 break;
             }
       });
     });
      }
      // end of update

      // add items
      let addeditems = Promise.each(this.newElements[0], (electronic) => {
        return this.productDescTDG
          .add(electronic)
          .transacting(trx)
          .then(
            (model_number) => {
              Promise.each(electronic.serial_number, (item_serial_number) => {
                return this.inventoryItemsTDG
                .add(item_serial_number, electronic.model_number)
                .transacting(trx)
                .then(
                  (id) => {
                    console.log('added inventory item ');
                  });
              });

              switch (electronic.type) {
                case 'Desktop':
                  {
                    return this.dimensionsTDG
                      .add(electronic)
                      .transacting(trx)
                      .then(
                        (dimensionsId) => {
                          return this.computersTDG
                          .add(electronic)
                          .transacting(trx)
                          .then(
                            (compId) => {
                              return this.desktopsTDG
                              .add(compId, dimensionsId, electronic)
                              .transacting(trx);
                            });
                          });
                  };
                  break;
                case 'Laptop':
                  {
                    return this.computersTDG
                    .add(electronic)
                    .transacting(trx)
                    .then(
                      (compId) => {
                        return this.laptopsTDG
                        .add(compId, electronic)
                        .transacting(trx);
                      });
                  };
                  break;
                case 'Tablet':
                  {
                    return this.dimensionsTDG
                      .add(electronic)
                      .transacting(trx)
                      .then(
                        (dimensionsId) => {
                          return this.computersTDG
                          .add(electronic)
                          .transacting(trx)
                          .then((compId) => {
                            return this.tabletsTDG
                            .add(compId, dimensionsId, electronic)
                            .transacting(trx);
                      });
                    });
                  };
                  break;
                case 'Monitor':
                  {
                    return this.monitorsTDG.add(electronic).transacting(trx);
                  };
                  break;
              }
            });
      }); // add
      Promise.props([deletedItems, updateditems, addeditems])
      .then(trx.commit)
      .catch(trx.rollback);
    });
  }

  // the following function is getting all the items along with their descriptions
  getAllInventoryItems() {
    return new Promise((resolve, reject) => {
      let desktops = this.getAllDesktops();
      let laptops = this.getAllLaptops();
      let tablets = this.getAllTablets();
      let monitors = this.getAllMonitors();

      Promise.all([laptops, desktops, tablets, monitors])
      .then(((results) => {
        let products = [].concat(...results);

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
  }

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
