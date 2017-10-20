const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let uow = new UnitOfWork();

function get(args) {
  return database('inventoryItem').select('*');
}

function getAllInventoryItems() {
  return uow.getAllInventoryItems();
}

module.exports = {
  get: get,
  getAllInventoryItems: getAllInventoryItems,
};
