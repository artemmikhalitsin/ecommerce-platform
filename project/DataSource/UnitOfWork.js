
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
  registerNew(object){
    this.newElements.push(object);
  }
  registerDirty(object){
    this.dirtyElements.push(object);
  }
  registerDeleted(object){
    this.deletedElements.push(object);
  }
  commitAll(object) {
      let electronics = [];
      return this.connection.transaction((trx) => {
        var context = this.connection('ProductDescription').select('*').transacting(trx);
        Promise.all([context])
        .then((values) => {
          let productDescriptions = JSON.stringify(values[0]);
          //console.log(values[0]);
          //var results = this.compareWithContext(values[0], electronics);
          var electronicsToAdd = object;//results[0];
          //var electronicsToUpdate = results[1];
          //var electronicsToDelete = results[2];
          console.log("Electronics to add: ");
          console.log(electronicsToAdd);
          console.log("Electronics new Elements: ");
          console.log(this.newElements[0]);
          console.log("Electronics to update ");
          console.log(this.dirtyElements[0]);
          console.log("Electronics to delete: ");
          console.log(this.deletedElements[0]);

          Promise.each(this.newElements[0], (electronic) => {
            console.log("Serial number"+ electronic.serial_number);
            return this.productDescTDG.add(electronic, trx) 
                .then((model_number) => {
                  return this.addInventoryItem(electronic.serial_number,
                                   electronic.model_number)
                            .then((id) => {
                              console.log('added inventory item ');
                            });
                
                switch (electronic.type) {
                  case 'Desktop': {
                    return this.dimensionsTDG.add(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.computersTDG.add(electronic)
                      .transacting(trx)
                      .then((compId) => {
                        return this.desktopsTDG.add(compId, dimensionsId, electronic)
                        .transacting(trx);
                      });
                    });
                  };break;
                  case 'Laptop': {
                    return this.computersTDG.add(electronic)
                    .transacting(trx)
                    .then((compId) => {
                      return this.laptopsTDG.add(compId, electronic)
                      .transacting(trx);
                    });
                  };break;
                  case 'Tablet': {
                    return this.dimensionsTDG.add(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.computersTDG.add(electronic)
                      .transacting(trx)
                      .then((compId) => {
                        return this.tabletsTDG.add(compId, dimensionsId, electronic)
                        .transacting(trx); 
                      });
                    });
                  };break;
                  case 'Monitor': {
                    return this.monitorsTDG.add(electronic)
                    .transacting(trx);
                  };break;
                }
                
              });
          })})
          .then(trx.commit)
          .catch(trx.rollback);
     });
  }

  addInventoryItem(serial_number, model_number) {
    return this.connection.insert({
        'model_number': model_number,
        'serial_number': serial_number,
      }, 'id')
    .into('Inventory');
  }

  getAllInventoryItems() {
    return this.connection('ProductDescription')
    .innerJoin('Inventory', 'Inventory.model_number',
               'ProductDescription.model_number')
    .select('*');
  }

  getAllProductsDescription() {
    return this.connection('ProductDescription').select('*');
  }

 compareWithContext(productDescriptions, electronics){
  var electronicsToAdd = [];
  var electronicsToUpdate = [];
  var electronicsToDelete = [];
  
  for(var i = 0; i < productDescriptions.length; i++){
    for(var j = 0; j < electronics.length; j++){
      if(productDescriptions[i].model_number == electronics[j].model_number &&
         electronicsToUpdate.findIndex(x => x.model_number == electronics[j].model_number) === -1) 
        electronicsToUpdate.push(electronics[j]);
    }
  }
  
  for(var i = 0; i < productDescriptions.length; i++){
    if(electronicsToUpdate.findIndex(x => x.model_number == productDescriptions[i].model_number) === -1 && 
        electronicsToDelete.findIndex(x => x.model_number == productDescriptions[i].model_number) === -1)
      electronicsToDelete.push(productDescriptions[i]);
  }
  for(var i = 0; i < electronics.length; i++){
    if(productDescriptions.findIndex(x => x.model_number == electronics[i].model_number) === -1 &&
        electronicsToAdd.findIndex(x => x.model_number == electronics[i].model_number) === -1)
        electronicsToAdd.push(electronics[i]);
  }
  return [electronicsToAdd, electronicsToUpdate, electronicsToDelete];
}
}
module.exports = UnitOfWork;
