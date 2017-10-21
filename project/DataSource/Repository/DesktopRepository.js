'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let uow = new UnitOfWork();

let InventoryItemsIdentityMap = require(rootPath + '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');
let inventoryIM = new InventoryItemsIdentityMap();

function save(desktop) {
  // return database('Desktop').insert(desktop);
  return uow.commit(desktop, 'Desktop');
};
function deletethistestfunction(){
  return inventoryIM.InventoryItems;
}
function save2(object) {
  return uow.commitAll(object);
}
function get(args) {
  return database('Desktop').select('*');
}

module.exports = {
  constructor: constructor,
  save: save,
  get: get,
  save2: save2,
  deletethistestfunction: deletethistestfunction
};
