
const Promise = require('bluebird');

class UnitOfWork {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.rootPath = require('app-root-dir').get();
    this.configuration = require(this.rootPath + '/knexfile')[this.environment];
    this.connection = require('knex')(this.configuration);
    
    let ProductDescriptionsTDG = require(this.rootPath + '/DataSource/TableDataGateway/PruductDescriptionsTDG.js');
    this.productDescTDG = new ProductDescriptionsTDG();

    let InventoryItemsTDG = require(this.rootPath + '/DataSource/TableDataGateway/InventoryItemsTDG.js');
    this.inventoryItemsTDG = new InventoryItemsTDG();
    
    let ComputersTDG = require(this.rootPath + '/DataSource/TableDataGateway/ComputersTDG.js');
    this.computersTDG = new ComputersTDG();

    let DesktopsTDG = require(this.rootPath + '/DataSource/TableDataGateway/DesktopsTDG.js');
    this.desktopsTDG = new DesktopsTDG();

    let DimensionsTDG = require(this.rootPath + '/DataSource/TableDataGateway/DimensionsTDG.js');
    this.dimensionsTDG = new DimensionsTDG();

    let LaptopsTDG = require(this.rootPath + '/DataSource/TableDataGateway/LaptopsTDG.js');
    this.laptopsTDG = new LaptopsTDG();

    let MonitorsTDG = require(this.rootPath + '/DataSource/TableDataGateway/MonitorsTDG.js');
    this.monitorsTDG = new MonitorsTDG();

    let TabletsTDG = require(this.rootPath + '/DataSource/TableDataGateway/TabletsTDG.js');
    this.tabletsTDG = new TabletsTDG();
  }

  commitAll(object) {
      let electronics = [{
        serial_number: '123',
        model_number: '70',
        brand_name: "b",
        price: 1,
        weight: 1,
        type: 'Desktop',
        processor_type: 'r',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3,
        dimensions: {depth: 1,
           height: 1,
           width: 1}
       },{
        serial_number: '1234',
        model_number: '61',
        brand_name: "b",
        price: 1,
        weight: 1,
        type: 'Desktop',
        processor_type: 'q',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3,
        dimensions: {depth: 1,
           height: 1,
           width: 1}
       },{
        serial_number: '12',
        model_number: '62',
        brand_name: "b",
        price: 1,
        weight: 1,
        type: 'Desktop',
        processor_type: 'n',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3,
        dimensions: {depth: 1,
           height: 1,
           width: 1}
       }];
      return this.connection.transaction((trx) => {
        var context = this.connection('ProductDescription').select('*').transacting(trx);
        Promise.all([context])
        .then((values) => {
          let productDescriptions = JSON.stringify(values[0]);
          console.log(values[0]);
          var results = this.compareWithContext(values[0], electronics);
          var electronicsToAdd = results[0];
          var electronicsToUpdate = results[1];
          var electronicsToDelete = results[2];
          console.log("Electronics to add: ");
          console.log(electronicsToAdd);
          console.log("Electronics to update ");
          console.log(electronicsToUpdate);
          console.log("Electronics to delete: ");
          console.log(electronicsToDelete);

          Promise.each(electronicsToAdd, (electronic) => {
            console.log("Serial number"+ !!electronic.serial_number);
            return this.productDescTDG.add(electronic, trx) 
                .then((model_number) => {
                  return this.addInventoryItem(electronic.serial_number,
                                   electronic.model_number)
                            .then((id) => {
                              console.log('added inventory item');
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
