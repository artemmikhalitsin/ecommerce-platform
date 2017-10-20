
const Promise = require('bluebird');

class UnitOfWork {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.rootPath = require('app-root-dir').get();
    this.configuration = require(this.rootPath + '/knexfile')[this.environment];
    this.connection = require('knex')(this.configuration);
  }

  addProductDescription(electronic) {
    return this.connection.insert({
        'model_number': electronic.model_number,
        'brand_name': electronic.brand_name,
        'weight': electronic.weight,
        'price': electronic.price,
        'type': electronic.type,
      }, 'model_number')
    .into('ProductDescription');
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
              return this.addProductDescription(electronic)
                .then((model_number) => {
                  if(!!electronic.serial_number)
                  return this.addInventoryItem(electronic.serial_number,
                                   electronic.model_number)
                  .then((id) => {
                    console.log('added inventory item');
                  });
                switch (electronic.type) {
                  case 'Desktop': {
                    return this.addDimensions(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.addComputer(electronic)
                      .transacting(trx)
                      .then((compId) => {
                        return this.addDesktop(compId, dimensionsId, electronic)
                        .transacting(trx);
                      });
                    });
                  };break;
                  case 'Laptop': {
                    return this.addComputer(electronic)
                    .transacting(trx)
                    .then((compId) => {
                      return this.addLaptop(compId, electronic)
                      .transacting(trx);
                    });
                  };break;
                  case 'Tablet': {
                    return this.addDimensions(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.addComputer(electronic)
                      .transacting(trx)
                      .then((compId) => {
                        return this.addTablet(compId, dimensionsId, electronic)
                        .transacting(trx);
                      });
                    });
                  };break;
                  case 'TV': {
                    return this.addDimensions(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.addTV(dimensionsId, electronic)
                      .transacting(trx);
                    });
                  };break;
                  case 'Monitor': {
                    return this.addMonitor(electronic)
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

  addDimensions(electronic) {
    return this.connection.insert(electronic.dimensions, 'dimension_id')
    .into('Dimensions');
  }

  addComputer(electronic) {
    return this.connection.insert({
        'processor_type': electronic.processor_type,
        'ram_size': electronic.ram_size,
        'number_cpu_cores': electronic.number_cpu_cores,
        'harddrive_size': electronic.harddrive_size,
    }, 'comp_id')
    .into('Computer');
  }

  addDesktop(compId, dimensionsId, electronic) {
    return this.connection.insert({
        'comp_id': compId,
        'model_number': electronic.model_number,
        'dimension_id': dimensionsId,
    }, 'id')
    .into('Desktop');
  }

  addLaptop(compId, electronic) {
    return this.connection.insert({
        'comp_id': compId,
        'model_number': electronic.model_number,
        'display_size': electronic.display_size,
        'battery_info': electronic.battery_info,
        'os': electronic.os,
        'camera': electronic.camera,
        'touch_screen': electronic.touch_screen,
    }, 'id')
    .into('Laptop');
  }

  addTablet(compId, dimensionsId, electronic) {
    return this.connection.insert({
        'comp_id': compId,
        'model_number': electronic.model_number,
        'dimension_id': dimensionsId,
        'display_size': electronic.display_size,
        'battery_info': electronic.battery_info,
        'os': electronic.os,
        'camera_info': electronic.camera_info,
    }, 'id')
    .into('Tablet');
  }

  addMonitor(electronic) {
    return this.connection.insert({
        'model_number': electronic.model_number,
        'display_size': electronic.display_size,
    }, 'id')
    .into('Monitor');
  }

  addTV(dimensionsId, electronic) {
    return this.connection.insert({
        'model_number': electronic.model_number,
        'dimension_id': dimensionsId,
        'category_name': electronic.category_name,
    }, 'id')
    .into('TV');
  }

 compareWithContext(productDescriptions, electronics){
  var electronicsToAdd = [];
  var electronicsToUpdate = [];
  var electronicsToDelete = [];
  
  for(var i = 0; i < productDescriptions.length; i++){
    for(var j = 0; j < electronics.length; j++){
      console.log("in the contex? "+ productDescriptions[i].model_number);
      console.log("This is inside the first nested loop: " + electronics[j].model_number + "is in the list?" + electronicsToUpdate.findIndex(x => x.model_number == electronics[j].model_number));
      if(productDescriptions[i].model_number == electronics[j].model_number && electronicsToUpdate.findIndex(x => x.model_number == electronics[j].model_number) === -1) 
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
