/* eslint-disable */
// Eslint disabled for this file only until it is documented

// REVIEW: I haven't docced this file yet cause it's a little overwhelming
// Only fixed some formatting - Artem
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('bluebird');
var rootPath = require('app-root-dir').get();
var environment = process.env.NODE_ENV || 'development';
var configuration = require(rootPath + '/knexfile')[environment];
var connection = require('knex')(configuration);

var ProductDescriptionsTDG = require(rootPath + '/DataSource/TableDataGateway/ProductDescriptionsTDG.js');
var InventoryItemsTDG = require(rootPath + '/DataSource/TableDataGateway/InventoryItemsTDG.js');
var ComputersTDG = require(rootPath + '/DataSource/TableDataGateway/ComputersTDG.js');
var DesktopsTDG = require(rootPath + '/DataSource/TableDataGateway/DesktopsTDG.js');
var DimensionsTDG = require(rootPath + '/DataSource/TableDataGateway/DimensionsTDG.js');
var LaptopsTDG = require(rootPath + '/DataSource/TableDataGateway/LaptopsTDG.js');
var MonitorsTDG = require(rootPath + '/DataSource/TableDataGateway/MonitorsTDG.js');
var TabletsTDG = require(rootPath + '/DataSource/TableDataGateway/TabletsTDG.js');
var PurchaseCollectionTDG = require(rootPath + '/DataSource/TableDataGateway/PurchaseCollectionTDG.js');

/**
 * Unit of Work implementation
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS, ATTRIBUTE IT TO YOURSELF
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */

var UnitOfWork = function () {
  /**
   * Constructor initiates all table data gateways
   */
  // REVIEW: TDGS have no instance variables - do we need to instantiate them? - Artem
  function UnitOfWork() {
    _classCallCheck(this, UnitOfWork);

    this.productDescTDG = new ProductDescriptionsTDG();
    this.inventoryItemsTDG = new InventoryItemsTDG();
    this.computersTDG = new ComputersTDG();
    this.desktopsTDG = new DesktopsTDG();
    this.dimensionsTDG = new DimensionsTDG();
    this.laptopsTDG = new LaptopsTDG();
    this.monitorsTDG = new MonitorsTDG();
    this.tabletsTDG = new TabletsTDG();
    this.purchaseTDG = new PurchaseCollectionTDG();

    this.dirtyElements = [];
    this.newElements = [];
    this.deletedElements = [];
    this.newInventoryItems = [];
    this.deletedInventoryItems = [];
    this.newPurchases = [];
    this.deletePurchases = [];
  }

  _createClass(UnitOfWork, [{
    key: 'registerNew',
    value: function registerNew(object) {
      this.newElements = [];
      this.newElements.push(object);
    }
  }, {
    key: 'registerNewPurchase',
    value: function registerNewPurchase(object) {
      this.newPurchases = [];
      this.newPurchases.push(object);
    }
  }, {
    key: 'registerReturn',
    value: function registerReturn(object) {
      this.deletePurchases = [];
      this.deletedPurchase.push(object);
    }
  }, {
    key: 'registerDirty',
    value: function registerDirty(object) {
      this.dirtyElements = [];
      this.dirtyElements.push(object);
    }
  }, {
    key: 'registerDeleted',
    value: function registerDeleted(object) {
      this.deletedElements = [];
      this.deletedElements.push(object);
    }
  }, {
    key: 'registerNewItem',
    value: function registerNewItem(object) {
      this.newInventoryItems = [];
      this.newInventoryItems.push(object);
    }
  }, {
    key: 'registerDeletedItem',
    value: function registerDeletedItem(object) {
      this.deletedInventoryItems = [];
      this.deletedInventoryItems.push(object);
    }
  }, {
    key: 'commitAll',
    value: function commitAll() {
      var _this = this;

      var electronics = [];
      return connection.transaction(function (trx) {
        console.log('Electronics new Elements: ');
        console.log(_this.newElements[0]);
        console.log('Electronics to update ');
        console.log(_this.dirtyElements[0]);
        console.log("Inventory items to add");
        console.log(_this.newInventoryItems[0]);
        console.log("Inventory items to delete: ");
        console.log(_this.deletedInventoryItems[0]);
        console.log("Purchase to add:");;
        console.log(_this.newPurchases[0]);
        console.log("Purchase to delete:");
        console.log(_this.deletePurchases[0]);

        var deletedItems = void 0;
        //delete items
        if (_this.deletedInventoryItems[0] != null && _this.deletedInventoryItems[0].length > 0) {
          deletedItems = Promise.each(_this.deletedInventoryItems[0], function (electronic) {
            return _this.inventoryItemsTDG.delete(electronic).transacting(trx).then(function () {
              console.log('deleted inventory item');
            });
          });
        }
        //end of delete
        //add items
        var newItems = void 0;
        if (_this.newInventoryItems[0] != null && _this.newInventoryItems[0].length > 0) {
          newItems = Promise.each(_this.newInventoryItems[0], function (electronic) {
            return _this.inventoryItemsTDG.add(electronic.serial_number, electronic.model_number).transacting(trx).then(function () {
              console.log('added inventory item');
            });
          });
        }

        //add purchases
        var purchasedItems = void 0;
        if (_this.newPurchases[0] != null && _this.newPurchases[0].length > 0) {
          purchasedItems = Promise.each(_this.newPurchases[0], function (electronic) {
            return _this.purchaseTDG.add(electronic.client, electronic.serial_number, electronic.model_number, electronic.purchase_Id).transacting(trx).then(function () {
              console.log("Added purchased items");
            });
          });
        }

        //remove purchase
        var deletedPurchase = void 0;
        if (_this.deletedPurchases[0] != null && _this.deletedPurchases[0].length > 0) {
          deletedPurchases = Promise.each(_this.deletedPurchases[0], function (electronic) {
            return _this.purchaseTDG.delete(electronic).transacting(trx).then(function () {
              console.log('deleted purchase item');
            });
          });
        }

        //update products
        var updateditems = void 0;
        if (_this.dirtyElements[0] && _this.dirtyElements[0].length > 0) {

          updateditems = Promise.each(_this.dirtyElements[0], function (electronic) {
            return _this.productDescTDG.update(electronic).transacting(trx).then(function (model_number) {
              switch (electronic.type) {
                case 'Desktop':
                  {
                    return _this.dimensionsTDG.update(electronic.dimension).transacting(trx).then(function (dimensionsId) {
                      return _this.computersTDG.update(electronic).transacting(trx).then(function (compId) {
                        return _this.desktopsTDG.update(compId, dimensionsId, electronic).transacting(trx);
                      });
                    });
                  };
                  break;
                case 'Laptop':
                  {
                    return _this.computersTDG.update(electronic).transacting(trx).then(function (compId) {
                      return _this.laptopsTDG.update(compId, electronic).transacting(trx);
                    });
                  };
                  break;
                case 'Tablet':
                  {
                    return _this.dimensionsTDG.update(electronic.dimension).transacting(trx).then(function (dimensionsId) {
                      return _this.computersTDG.update(electronic).transacting(trx).then(function (compId) {
                        return _this.tabletsTDG.update(compId, dimensionsId, electronic).transacting(trx);
                      });
                    });
                  };
                  break;
                case 'Monitor':
                  {
                    return _this.monitorsTDG.update(electronic).transacting(trx);
                  };
                  break;
              }
            });
          });
        }
        // end of update

        //add products
        var addeditems = void 0;
        if (_this.newElements[0] != null) {
          addeditems = Promise.each(_this.newElements[0], function (electronic) {
            return _this.productDescTDG.add(electronic).transacting(trx).then(function (model_number) {
              /*Promise.each(electronic.serial_number, (item_serial_number) => {
                return this.inventoryItemsTDG.add(item_serial_number, electronic.model_number).transacting(trx).then((id) => {
                  console.log('added inventory item ');
                });
              });*/
              switch (electronic.type) {
                case 'Desktop':
                  {
                    return _this.dimensionsTDG.add(electronic).transacting(trx).then(function (dimensionsId) {
                      return _this.computersTDG.add(electronic).transacting(trx).then(function (compId) {
                        return _this.desktopsTDG.add(compId, dimensionsId, electronic).transacting(trx);
                      });
                    });
                  };
                  break;
                case 'Laptop':
                  {
                    return _this.computersTDG.add(electronic).transacting(trx).then(function (compId) {
                      return _this.laptopsTDG.add(compId, electronic).transacting(trx);
                    });
                  };
                  break;
                case 'Tablet':
                  {
                    return _this.dimensionsTDG.add(electronic).transacting(trx).then(function (dimensionsId) {
                      return _this.computersTDG.add(electronic).transacting(trx).then(function (compId) {
                        return _this.tabletsTDG.add(compId, dimensionsId, electronic).transacting(trx);
                      });
                    });
                  };
                  break;
                case 'Monitor':
                  {
                    return _this.monitorsTDG.add(electronic).transacting(trx);
                  };
                  break;
              }
            });
          }
          //add
          );
        }
        Promise.props([newItems, purchasedItems, deletedItems, updateditems, addeditems]).then(trx.commit).catch(trx.rollback);
      });
    }

    // the following function is getting all the items along with their descriptions

  }, {
    key: 'getAllInventoryItems',
    value: function getAllInventoryItems() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var desktops = _this2.getAllDesktops();
        var laptops = _this2.getAllLaptops();
        var tablets = _this2.getAllTablets();
        var monitors = _this2.getAllMonitors();

        Promise.all([laptops, desktops, tablets, monitors]).then(function (results) {
          var _ref;

          var products = (_ref = []).concat.apply(_ref, _toConsumableArray(results)); //[].concat.apply([], results); //

          // retrieve the model numbers present in the products
          var model_numbers = _this2.getAllModelNumbers(products);

          // getting the serial numbers associated with the model numbers
          connection('Inventory').select('*').havingIn('model_number', model_numbers).then(function (serials) {
            products = products.map(function (product) {
              var serial_numbers = serials.filter(function (serial) {
                return serial.model_number === product.model_number;
              }).map(function (serial) {
                return serial.serial_number;
              });

              product.serial_numbers = serial_numbers;
              return product;
            });

            resolve(products);
          });
        }).catch(function (err) {
          return reject(err);
        });
      });
    }

    // this function is getting all the model numbers from all the products

  }, {
    key: 'getAllModelNumbers',
    value: function getAllModelNumbers(products) {
      return products.map(function (obj) {
        return obj.model_number;
      });
    }

    // this function already exists in the ProductDescriptionsTDG so it should be removed

  }, {
    key: 'getAllProductsDescription',
    value: function getAllProductsDescription() {
      return connection('ProductDescription').select('*');
    }

    // the following getter function will need to be moved to their respective TDGs

  }, {
    key: 'getAllDesktops',
    value: function getAllDesktops() {
      return connection('ProductDescription').innerJoin('Desktop', 'Desktop.model_number', 'ProductDescription.model_number').innerJoin('Computer', 'Desktop.comp_id', 'Computer.comp_id').innerJoin('Dimensions', 'Desktop.dimension_id', 'Dimensions.dimension_id').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores', 'harddrive_size', 'depth', 'height', 'width');
    }
  }, {
    key: 'getAllLaptops',
    value: function getAllLaptops() {
      return connection('ProductDescription').innerJoin('Laptop', 'Laptop.model_number', 'ProductDescription.model_number').innerJoin('Computer', 'Laptop.comp_id', 'Computer.comp_id').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores', 'harddrive_size', 'os', 'touch_screen', 'camera', 'display_size', 'battery_info');
    }
  }, {
    key: 'getAllTablets',
    value: function getAllTablets() {
      return connection('ProductDescription').innerJoin('Tablet', 'Tablet.model_number', 'ProductDescription.model_number').innerJoin('Computer', 'Tablet.comp_id', 'Computer.comp_id').innerJoin('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores', 'harddrive_size', 'display_size', 'battery_info', 'camera_info', 'os', 'depth', 'height', 'width');
    }
  }, {
    key: 'getAllMonitors',
    value: function getAllMonitors() {
      return connection('ProductDescription').innerJoin('Monitor', 'Monitor.model_number', 'ProductDescription.model_number').select('ProductDescription.model_number', 'brand_name', 'price', 'type', 'weight', 'is_available', 'display_size');
    }

    // NOTE if we are not using this function then it should be removed. If we gonna use it later then ignore this comment

  }, {
    key: 'compareWithContext',
    value: function compareWithContext(productDescriptions, electronics) {
      var electronicsToAdd = [];
      var electronicsToUpdate = [];
      var electronicsToDelete = [];
      for (var i = 0; i < productDescriptions.length; i++) {
        for (var j = 0; j < electronics.length; j++) {
          if (productDescriptions[i].model_number == electronics[j].model_number && electronicsToUpdate.findIndex(function (x) {
            return x.model_number == electronics[j].model_number;
          }) === -1) {
            electronicsToUpdate.push(electronics[j]);
          }
        }
      }

      for (var i = 0; i < productDescriptions.length; i++) {
        if (electronicsToUpdate.findIndex(function (x) {
          return x.model_number == productDescriptions[i].model_number;
        }) === -1 && electronicsToDelete.findIndex(function (x) {
          return x.model_number == productDescriptions[i].model_number;
        }) === -1) {
          electronicsToDelete.push(productDescriptions[i]);
        }
      }
      for (var i = 0; i < electronics.length; i++) {
        if (productDescriptions.findIndex(function (x) {
          return x.model_number == electronics[i].model_number;
        }) === -1 && electronicsToAdd.findIndex(function (x) {
          return x.model_number == electronics[i].model_number;
        }) === -1) {
          electronicsToAdd.push(electronics[i]);
        }
      }
      return [electronicsToAdd, electronicsToUpdate, electronicsToDelete];
    }
  }]);

  return UnitOfWork;
}();

module.exports = UnitOfWork;