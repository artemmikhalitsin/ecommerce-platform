const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
let uow = require(rootPath + '/DataSource/UnitOfWork.js');

function save(inventoryItem) {
  database('InventoryItem').insert(inventoryItem)
    .then((inventoryItem) => {
      res.status(200).json(inventoryItem);
      return res.send(inventoryItem);
    })
    .catch((error) => {
      res.status(500).json({error});
      return res.send(inventoryItem);
    });
};

function get(args) {
  return database('inventoryItem').select('*');
}

function getAllInventoryItems(){
  return uow.getAllInventoryItems();
}

module.exports = {
  save: save,
  get: get,
  getAllInventoryItems: getAllInventoryItems,
};
