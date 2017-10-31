const Promise = require('bluebird');

let rootPath = require('app-root-dir').get();

let ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
let InventoryItemsTDG = require(rootPath + '/DataSource/TableDataGateway/InventoryItemsTDG.js');
let ComputersTDG = require(rootPath + '/DataSource/TableDataGateway/ComputersTDG.js');
let DesktopsTDG = require(rootPath + '/DataSource/TableDataGateway/DesktopsTDG.js');
let DimensionsTDG = require(rootPath + '/DataSource/TableDataGateway/DimensionsTDG.js');
let LaptopsTDG = require(rootPath + '/DataSource/TableDataGateway/LaptopsTDG.js');
let MonitorsTDG = require(rootPath + '/DataSource/TableDataGateway/MonitorsTDG.js');
let TabletsTDG = require(rootPath + '/DataSource/TableDataGateway/TabletsTDG.js');

class UnitOfWork {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.configuration = require(rootPath + '/knexfile')[this.environment];
    this.connection = require('knex')(this.configuration);

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
    return this.connection.transaction((trx) => {
      console.log("Electronics new Elements: ");
      console.log(this.newElements[0]);
      console.log("Electronics to update ");
      console.log(this.dirtyElements[0]);
      console.log("Electronics to delete: ");
      console.log(this.deletedElements[0]);

      //delete items
      Promise.each(this.deletedElements[0], (electronics) => {
        return this.InventoryItemsTDG.delete(electronic, trx).then((serial_number) => {
          Promise.each(electronic.serial_number, (item_serial_number) => {
            return this.deleteInventoryItems(item_serial_number, electronic.serial_number).then((id) => {
              console.log('deleted inventory item');
            })
          })
        })
      }).then(trx.commit).catch(trx.rollback);
      //end of delete

      //update
      Promise.each(this.newElements[0], (electronic) => {
        return this.productDescTDG.update(electronic, trx).then((model_number) => {
          Promise.each(electronic.model_number, (item_model_number) => {
            return this.updateDescription(item_model_number, electronic.model_number).then((id) => {
              console.log('updated item description');
            });
          });

          switch (electronic.type) {
            case 'Desktop':
              {
                return this.dimensionsTDG.update(electronic).transacting(trx).then((dimensionsId) => {
                  return this.computersTDG.update(electronic).transacting(trx).then((compId) => {
                    return this.desktopsTDG.update(compId, dimensionsId, electronic).transacting(trx);
                  });
                });
              };
              break;
            case 'Laptop':
              {
                return this.computersTDG.update(electronic).transacting(trx).then((compId) => {
                  return this.laptopsTDG.update(compId, electronic).transacting(trx);
                });
              };
              break;
            case 'Tablet':
              {
                return this.dimensionsTDG.update(electronic).transacting(trx).then((dimensionsId) => {
                  return this.computersTDG.update(electronic).transacting(trx).then((compId) => {
                    return this.tabletsTDG.update(compId, dimensionsId, electronic).transacting(trx);
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
      }).then(trx.commit).catch(trx.rollback);
      //end of update

      //add items
      Promise.each(this.newElements[0], (electronic) => {
        return this.productDescTDG.add(electronic, trx).then((model_number) => {
          Promise.each(electronic.serial_number, (item_serial_number) => {
            return this.addInventoryItem(item_serial_number, electronic.model_number).then((id) => {
              console.log('added inventory item ');
            });
          });

          switch (electronic.type) {
            case 'Desktop':
              {
                return this.dimensionsTDG.add(electronic).transacting(trx).then((dimensionsId) => {
                  return this.computersTDG.add(electronic).transacting(trx).then((compId) => {
                    return this.desktopsTDG.add(compId, dimensionsId, electronic).transacting(trx);
                  });
                });
              };
              break;
            case 'Laptop':
              {
                return this.computersTDG.add(electronic).transacting(trx).then((compId) => {
                  return this.laptopsTDG.add(compId, electronic).transacting(trx);
                });
              };
              break;
            case 'Tablet':
              {
                return this.dimensionsTDG.add(electronic).transacting(trx).then((dimensionsId) => {
                  return this.computersTDG.add(electronic).transacting(trx).then((compId) => {
                    return this.tabletsTDG.add(compId, dimensionsId, electronic).transacting(trx);
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
      }
      //add
      ).then(trx.commit).catch(trx.rollback);
    });
  }

  deleteInventoryItems(serial_number) {
    return this.connection.from('Inventory').where('id', id).del({'serial_number': serial_number});
  }


  updateDescription(){

  }
  addInventoryItem(serial_number, model_number) {
    return this.connection.insert({
      'model_number': model_number,
      'serial_number': serial_number
    }, 'id').into('Inventory');
  }

  /*getAllInventoryItems() {
    /*return new Promise((resolve, reject) => {
      let desktops =  DesktopTDG.getAllDesktops();
      let laptops = LaptopTDG.getAllLaptops();
      let tablets = // get all deksktops
      let monitors = //get all monitors

      Promise.all([laptops, desktops, tablets, monitors])
      .then((results => {
        let products = [].concat(...results);

        // retrieve the model numbers present in the products
        let model_numbers = this.getAllModelNumbers(products);

        // getting the serial numbers associated with the model numbers
        this.connection('Inventory')
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
      .catch(err => reject(err))
    })
    return this.connection('ProductDescription')
    .innerJoin('Inventory', 'Inventory.model_number', 'ProductDescription.model_number')
    .select('*');
  }*/

  getAllModelNumbers(products) {
    return products.map((obj) => {
      return obj.model_number;
    });
  }

  getAllProductsDescription() {
    return this.connection('ProductDescription').select('*');
  }

  getAllDesktops() {
    return this.connection('ProductDescription').innerJoin('Desktop', 'Desktop.model_number', 'ProductDescription.model_number').innerJoin('Computer', 'Desktop.comp_id', 'Computer.comp_id').innerJoin('Dimensions', 'Desktop.dimension_id', 'Dimensions.dimension_id').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores', 'harddrive_size', 'depth', 'height', 'width');
  }

  getAllLaptops() {
    return this.connection('ProductDescription').innerJoin('Laptop', 'Laptop.model_number', 'ProductDescription.model_number').innerJoin('Computer', 'Laptop.comp_id', 'Computer.comp_id').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores', 'harddrive_size', 'os', 'touch_screen', 'camera', 'display_size', 'battery_info');
  }

  getAllTablets() {
    return this.connection('ProductDescription').innerJoin('Tablet', 'Tablet.model_number', 'ProductDescription.model_number').innerJoin('Computer', 'Tablet.comp_id', 'Computer.comp_id').innerJoin('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores', 'harddrive_size', 'display_size', 'battery_info', 'camera_info', 'os', 'depth', 'height', 'width');
  }

  getAllMonitors() {
    return this.connection('ProductDescription').innerJoin('Monitor', 'Monitor.model_number', 'ProductDescription.model_number').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'display_size');
  }

  getAllTVs() {
    return this.connection('ProductDescription').innerJoin('TV', 'TV.model_number', 'ProductDescription.model_number').innerJoin('Dimensions', 'TV.dimension_id', 'Dimensions.dimension_id').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'category_name', 'height', 'width', 'depth');
  }

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
