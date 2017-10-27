'use strict';
class DesktopRepository{
  constructor(){
    this.environment = process.env.NODE_ENV || 'development';
    this.rootPath = require('app-root-dir').get();
    this.configuration = require(this.rootPath + '/knexfile')[this.environment];
    this.database = require('knex')(this.configuration);
    let UnitOfWork = require(this.rootPath + '/DataSource/UnitOfWork.js');
    this.uow = new UnitOfWork();

    let InventoryItemsIdentityMap = require(this.rootPath + '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');
    this.inventoryIM = new InventoryItemsIdentityMap();
  }
  save(desktop) {
  // return database('Desktop').insert(desktop);
    return this.uow.commit(desktop, 'Desktop');
  }
  deletethistestfunction(){
    return this.inventoryIM.getAll();
  }
  save2(object) {
    return this.uow.commitAll(object);
  }
  get(args) {
    return this.database('Desktop').select('*');
  }
}
module.exports = DesktopRepository;
