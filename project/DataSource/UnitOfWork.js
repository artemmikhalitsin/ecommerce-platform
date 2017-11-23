/* eslint-disable */
// Eslint disabled for this file only until it is documented
'use strict';
const rootPath = require('app-root-dir').get();
const RepositoryRegistry = require(rootPath +
   '/DataSource/RepositoryRegistry.js')

<<<<<<< HEAD
=======
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
  // THE NEXT LINE SHOULD BE DELETED
const Monitor = require(rootPath +
  '/models/Monitor.js');

>>>>>>> 13199cafee02b9358cc7df4492963c57308aac37
/**
 * Unit of Work implementation
 * @author Ekaterina Ruhlin
 * @author Artem Mikhalitsin
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class UnitOfWork {
  /**
   * Constructor initiates all table data gateways
   */
  constructor() {
    // Items are registered here to be commited
    this.newElements = [];
    this.dirtyElements = [];
    this.deletedElements = [];
<<<<<<< HEAD

    // Items are reigsted here in case of rollback
    this.inserted = [];
    this.cleanElements = [];
    this.deleted = [];
=======
    this.newInventoryItems = [];
    this.deletedInventoryItems = [];
    this.newPurchases = [];
    this.deletedPurchases = [];
    this.transactionItems = [];
    let monitor = new Monitor(10, 10, 10,
                'nistilahkim', 10, 'Monitor', true);
    //monitorsTDG.insert(monitor);
>>>>>>> 13199cafee02b9358cc7df4492963c57308aac37
  }

  registerNew(object) {
    this.newElements.push(object);
  }
  registerClean(object) {
    this.cleanElements.push(object);
  }
  registerDirty(object) {
    this.dirtyElements.push(object);
  }

  registerDeleted(object) {
    this.deletedElements.push(object);
  }

  commit() {
    return this.saveNew()
    .then(() => this.updateDirty())
    .then(() => this.eraseDeleted())
    .catch((err) => {
      // If something went wrong - we rollback
      return this.rollback()
      .then(() => {
        // Now re-throw the error to notify whatever was using the uow
        throw new Error('An error caused a rollback in the unit of work:\n' +
                        err.toString())
      });
    });
  }

  saveNew() {
    return new Promise((resolve, reject) => {
      let insertions = this.newElements.map(
        (object) => {
          return RepositoryRegistry.getRepo(object).insert(object)
          .then(() => this.inserted.push(object));
          });
      Promise.all(insertions)
      .then(() => {resolve(true)})
      //Some promises rejected, so reject
      .catch((err) => {reject(err)});
    });
  }

  updateDirty() {
    return new Promise((resolve, reject) => {
      let updates = this.dirtyElements.map(
        (object) => {
          // First fetch the 'clean object'

          return RepositoryRegistry.getRepo(object).update(object)
        });
      Promise.all(updates)
      //All promises satisfied: continue
      .then(() => {resolve(true)})
      //Some promises rejected, so reject
      .catch((err) => {reject(err)});
    });
  }

  eraseDeleted() {
    return new Promise((resolve, reject) => {
      let deletions = this.deletedElements.map(
        (object) => {
          return RepositoryRegistry.getRepo(object).delete(object)
          .then(
            () => {this.deleted.push(object);});
        });
      Promise.all(deletions)
      //All promises satisfied: continue
      .then(() => {resolve(true)})
      //Some promises rejected, so reject
      .catch((err) => {reject(err)});
    });
  }

  rollback() {
    return new Promise((resolve, reject) => {
      // Reverse the operations
      this.newElements = this.deleted;
      this.dirtyElements = this.cleanElements;
      this.deletedElements = this.new;
      return this.saveNew()
      .then(() => this.updateDirty())
      .then(() => this.eraseDeleted())
    })
  }
}

module.exports = UnitOfWork;
