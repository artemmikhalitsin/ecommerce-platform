
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
function commitAll(electronics){
    
    return connection.transaction(function(trx){
        Promise.each(electronics, function(electronic){
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

module.exports = {
  constructor: constructor,
  commitAll: commitAll,
  getAllProductsDescription: getAllProductsDescription,
};
