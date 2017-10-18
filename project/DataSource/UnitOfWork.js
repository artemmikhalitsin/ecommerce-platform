
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
let Promise = require('bluebird');

    function constructor(connection) {
       this.connection = connection;
    }

   function commit(object, tableName) {
       let descriptions = [{
        model_number: '56',
        brand_name: 'b',
        price: 1,
        weight: 1,
       }, {
        model_number: '57',
        brand_name: 'b',
        price: 1,
        weight: 1,
       }, {
        model_number: '58',
        brand_name: 'b',
        price: 1,
        weight: 1,
       }];
       let computersObj = [{
        processor_type: 'r',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3,
       }, {
        processor_type: 'q',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3,
       }, {
        processor_type: 'n',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3,
       }];
       let electronics = [{
        comp_id: 0,
        model_number: 0,
        dimension_id: 0,
       }, {
        comp_id: 0,
        model_number: 0,
        dimension_id: 0,
       }, {
        comp_id: 0,
        model_number: 0,
        dimension_id: 0,
       }];
       let dimensions = [{
        depth: 1,
        height: 1,
        width: 1,
       }];
       if (tableName == 'Desktop' ||
          tableName == 'Laptop' ||
          tableName == 'Tablet') {
return connection.transaction(function(trx) {
      connection.insert(descriptions, 'model_number')
        .into('ProductDescription')
        .transacting(trx)
        .then(function(modelNumbers) {
          console.log(modelNumbers);
          return connection.insert(computersObj, 'comp_id')
            .into('Computer')
            .transacting(trx)
            .then(function(compIds) {
              return connection.insert(dimensions, 'dimensions_id')
                .into('Dimensions')
                .transacting(trx)
                .then(function(dimensionIds) {
                  electronics[0].comp_id = compIds[0];
                  electronics[0].dimension_id = dimensionIds[0];
                  electronics[0].model_number = '56';

                  return connection.insert(electronics[0])
                    .into(tableName)
                    .transacting(trx);
                  });
            });
        })
       .then(trx.commit)
       .catch(trx.rollback);
});
} else {
return connection.transaction(function(trx) {
  connection.insert(object)
    .into(tableName)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
   });
}
}

function commitAll(object) {
    let electronics = [{
     model_number: '56',
     serial_number: '10',
     brand_name: 'b',
     price: 1,
     weight: 1,
     type: 'Desktop',
     processor_type: 'r',
     ram_size: 1,
     number_cpu_cores: 2,
     harddrive_size: 3,
     dimensions: {depth: 1,
        height: 1,
        width: 1},
    }, {
     model_number: '57',
     serial_number: '11',
     brand_name: 'b',
     price: 1,
     weight: 1,
     type: 'Desktop',
     processor_type: 'q',
     ram_size: 1,
     number_cpu_cores: 2,
     harddrive_size: 3,
     dimensions: {depth: 1,
        height: 1,
        width: 1},
    }, {
     model_number: '58',
     serial_number: '12',
     brand_name: 'b',
     price: 1,
     weight: 1,
     type: 'Laptop',
     processor_type: 'n',
     ram_size: 1,
     number_cpu_cores: 2,
     harddrive_size: 3,
     display_size: 1,
     battery_info: 'info about battery',
     os: 'os info',
     camera: true,
     touch_screen: false,
   }, {
     model_number: '59',
     serial_number: '13',
     brand_name: 'b',
     price: 1,
     weight: 1,
     type: 'Tablet',
     processor_type: 'n',
     ram_size: 1,
     number_cpu_cores: 2,
     harddrive_size: 3,
     dimensions: {depth: 1,
        height: 1,
        width: 1},
     display_size: 1,
     battery_info: 'info about battery',
     os: 'os info',
     camera: 'camera info',
   }, {
     model_number: '60',
     serial_number: '14',
     brand_name: 'b',
     price: 1,
     weight: 1,
     type: 'Monitor',
     display_size: 1,
   }, {
     model_number: '61',
     serial_number: '15',
     brand_name: 'b',
     price: 1,
     weight: 1,
     type: 'TV',
     dimensions: {depth: 1,
        height: 1,
        width: 1},
     category_name: 'HD',
   }];
    return connection.transaction(function(trx) {
        Promise.each(electronics, function(electronic) {
            return addProductDescription(electronic)
              .then(function(model_number) {
                addInventoryItem(electronic.serial_number, electronic.model_number)
                .then(function(id){
                  console.log("added inventory item");
                });
              switch (electronic.type) {
                case 'Desktop': {
                  return addDimensions(electronic)
                  .transacting(trx)
                  .then(function(dimensionsId) {
                    return addComputer(electronic)
                    .transacting(trx)
                    .then(function(compId) {
                      return addDesktop(compId, dimensionsId, electronic)
                      .transacting(trx);
                    });
                  });
                };break;
                case 'Laptop': {
                  return addComputer(electronic)
                  .transacting(trx)
                  .then(function(compId) {
                    return addLaptop(compId, electronic)
                    .transacting(trx);
                  });
                };break;
                case 'Tablet': {
                  return addDimensions(electronic)
                  .transacting(trx)
                  .then(function(dimensionsId) {
                    return addComputer(electronic)
                    .transacting(trx)
                    .then(function(compId) {
                      return addTablet(compId, dimensionsId, electronic)
                      .transacting(trx);
                    });
                  });
                };break;
                case 'TV': {
                  return addDimensions(electronic)
                  .transacting(trx)
                  .then(function(dimensionsId) {
                    return addTV(dimensionsId, electronic)
                    .transacting(trx);
                  });
                };break;
                case 'Monitor': {
                  return addMonitor(electronic)
                  .transacting(trx);
                };break;
              }
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
   });
}

function getAllInventoryItems(){
  return connection('ProductDescription')
  .innerJoin('Inventory', 'Inventory.model_number', 'ProductDescription.model_number')
  .select('*');
}

function getAllProductsDescription() {
  return connection('ProductDescription').select('*');
}

function addInventoryItem(serial_number, model_number){
  return connection.insert({
      'model_number': model_number,
      'serial_number': serial_number,
    }, 'id')
  .into('Inventory');
}

function addProductDescription(electronic) {
  return connection.insert({
      'model_number': electronic.model_number,
      'brand_name': electronic.brand_name,
      'weight': electronic.weight,
      'price': electronic.price,
      'type': electronic.type,
    }, 'model_number')
  .into('ProductDescription');
}

function addDimensions(electronic) {
  return connection.insert(electronic.dimensions, 'dimension_id')
  .into('Dimensions');
}

function addComputer(electronic) {
  return connection.insert({
      'processor_type': electronic.processor_type,
      'ram_size': electronic.ram_size,
      'number_cpu_cores': electronic.number_cpu_cores,
      'harddrive_size': electronic.harddrive_size,
  }, 'comp_id')
  .into('Computer');
}

function addDesktop(compId, dimensionsId, electronic) {
  return connection.insert({
      'comp_id': compId,
      'model_number': electronic.model_number,
      'dimension_id': dimensionsId,
  }, 'id')
  .into('Desktop');
}

function addLaptop(compId, electronic) {
  return connection.insert({
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

function addTablet(compId, dimensionsId, electronic) {
  return connection.insert({
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

function addMonitor(electronic) {
  return connection.insert({
      'model_number': electronic.model_number,
      'display_size': electronic.display_size,
  }, 'id')
  .into('Monitor');
}

function addTV(dimensionsId, electronic) {
  return connection.insert({
      'model_number': electronic.model_number,
      'dimension_id': dimensionsId,
      'category_name': electronic.category_name,
  }, 'id')
  .into('TV');
}

module.exports = {
  constructor: constructor,
  commit: commit,
  commitAll: commitAll,
  getAllProductsDescription: getAllProductsDescription,
  getAllInventoryItems: getAllInventoryItems,
};
