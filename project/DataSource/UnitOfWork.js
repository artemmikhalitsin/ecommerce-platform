
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
var Promise = require('bluebird');

    function constructor(connection) {
       this.connection = connection;
    }
//in order to implement the identity map pattern, add a method in the commit all transaction to get all descriptions
//then split the descriptions into the different types and do the comparisson in each case whether add
//delete or update is necessary this way, in a single transaction we keep a copy of the db at its current sate.
function commitAll(object){
  var electronics = [{
    model_number: '655',
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
    return connection.transaction(function(trx){

      var context = connection('ProductDescription').select('*').transacting(trx);
      Promise.all([context])
      .then((values) => {
        let productDescriptions = JSON.stringify(values[0]);
        console.log(values[0]);
        var results = compareWithContext(values[0], electronics);
        var electronicsToAdd = results[0];
        var electronicsToUpdate = results[1];
        var electronicsToDelete = results[2];
        console.log("Electronics to add: ");
        console.log(electronicsToAdd);
        console.log("Electronics to update ");
        console.log(electronicsToUpdate);
        console.log("Electronics to delete: ");
        console.log(electronicsToDelete);
        
        Promise.each(electronicsToAdd, function(electronic){
          //if electronic.model_number exists in productDescriptions ==> update
          //else add 
          return addProductDescription(electronic)
            .then(function(model_number){
            switch(electronic.type){
              case 'Desktop':{
                return addDimensions(electronic)
                .transacting(trx)
                .then(function(dimensionsId){
                  return addComputer(electronic)
                  .transacting(trx)
                  .then(function(compId){
                    return addDesktop(compId, dimensionsId, electronic)
                    .transacting(trx);
                  });
                });
              };break;
              case 'Laptop': {
                return addComputer(electronic)
                .transacting(trx)
                .then(function(compId){
                  return addLaptop(compId, electronic)
                  .transacting(trx);
                });
              };break;
              case 'Tablet': {
                return addDimensions(electronic)
                .transacting(trx)
                .then(function(dimensionsId){
                  return addComputer(electronic)
                  .transacting(trx)
                  .then(function(compId){
                    return addTablet(compId, dimensionsId, electronic)
                    .transacting(trx);
                  });
                });
              };break;
              case 'TV': {
                return addDimensions(electronic)
                .transacting(trx)
                .then(function(dimensionsId){
                  return addTV(dimensionsId, electronic)
                  .transacting(trx);
                });
              };break;
              case 'Monitor': {
                return addMonitor(electronic)
                .transacting(trx);
              };break;
            }
          })
      })
      .then(trx.commit)
      .catch(trx.rollback);
      })
      //for each product description that exisits in the context but not in electronics list delete
      //cascade on delete
      .catch((err) => {
        console.log(err);
      });

   });
}

function getAllProductsDescription(){
  return connection('ProductDescription').select('*');
}

function addProductDescription(electronic){
  return connection.insert({
      'model_number': electronic.model_number,
      'brand_name': electronic.brand_name,
      'weight': electronic.weight,
      'price': electronic.price,
      'type': electronic.type
    }, 'model_number')
  .into('ProductDescription');
}

function addDimensions(electronic){
  return connection.insert(electronic.dimensions, 'dimension_id')
  .into('Dimensions');
}

function addComputer(electronic){
  return connection.insert({
      'processor_type': electronic.processor_type,
      'ram_size': electronic.ram_size,
      'number_cpu_cores': electronic.number_cpu_cores,
      'harddrive_size': electronic.harddrive_size
  },'comp_id')
  .into('Computer');
}

function addDesktop(compId, dimensionsId, electronic){
  return connection.insert({
      'comp_id': compId,
      'model_number': electronic.model_number,
      'dimension_id': dimensionsId
  }, 'id')
  .into('Desktop');
}

function addLaptop(compId, electronic){
  return connection.insert({
      'comp_id': compId,
      'model_number': electronic.model_number,
      'display_size': electronic.display_size,
      'battery_info': electronic.battery_info,
      'os': electronic.os,
      'camera': electronic.camera,
      'touch_screen': electronic.touch_screen
  }, 'id')
  .into('Laptop');
}

function addTablet(compId, dimensionsId, electronic){
  return connection.insert({
      'comp_id': compId,
      'model_number': electronic.model_number,
      'dimension_id': dimensionsId,
      'display_size': electronic.display_size,
      'battery_info': electronic.battery_info,
      'os': electronic.os,
      'camera_info': electronic.camera_info
  }, 'id')
  .into('Tablet');
}

function addMonitor(electronic){
  return connection.insert({
      'model_number': electronic.model_number,
      'display_size': electronic.display_size
  }, 'id')
  .into('Monitor');
}

function addTV(dimensionsId, electronic){
  return connection.insert({
      'model_number': electronic.model_number,
      'dimension_id': dimensionsId,
      'category_name': electronic.category_name
  }, 'id')
  .into('TV');
}
function compareWithContext(productDescriptions, electronics){
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

module.exports = {
  constructor: constructor,
  commitAll: commitAll,
  getAllProductsDescription: getAllProductsDescription,
};
