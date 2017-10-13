
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
var Promise = require('bluebird');

    function constructor(connection) {
       this.connection = connection;
    }
    
   function commit(object, tableName){
       var descriptions = [{
        model_number: '56',
        brand_name: "b",
        price: 1,
        weight: 1
       },{
        model_number: '57',
        brand_name: "b",
        price: 1,
        weight: 1
       },{
        model_number: '58',
        brand_name: "b",
        price: 1,
        weight: 1
       }];
       var computersObj = [{
        processor_type: 'r',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3
       },{
        processor_type: 'q',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3
       },{
        processor_type: 'n',
        ram_size: 1,
        number_cpu_cores: 2,
        harddrive_size: 3
       }];
       var electronics = [{
        comp_id: 0,
        model_number: 0,
        dimension_id: 0
       },{
        comp_id: 0,
        model_number: 0,
        dimension_id: 0
       },{
        comp_id: 0,
        model_number: 0,
        dimension_id: 0
       }];
       var dimensions = [{
        depth: 1,
        height: 1,
        width: 1
       }];
       if(tableName == 'Desktop' || tableName == 'Laptop' || tableName == 'Tablet')
       return connection.transaction(function(trx){
            connection.insert(descriptions, 'model_number')
                    .into('ProductDescription')
                    .transacting(trx)
                    .then(function(modelNumbers){
                        console.log(modelNumbers);
                        return connection.insert(computersObj, 'comp_id')
                                .into('Computer')
                                .transacting(trx)
                                .then(function(compIds){
                                    return connection.insert(dimensions, 'dimensions_id')
                                        .into('Dimensions')
                                        .transacting(trx)
                                        .then(function(dimensionIds){
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
       else return connection.transaction(function(trx){
        connection.insert(object)
                .into(tableName)
                .transacting(trx)
                .then(trx.commit)
                .catch(trx.rollback);
   });
}

function commitAll(object){
    var electronics = [{
     model_number: '56',
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
     model_number: '57',
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
     model_number: '58',
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
        Promise.each(electronics, function(electronic){
            return connection.insert({
                'model_number': electronic.model_number,
                'brand_name': electronic.brand_name,
                'weight': electronic.weight,
                'price': electronic.price,
                'type': electronic.type
              }, 'model_number')
            .into('ProductDescription')
            .then(function(model_number){
            switch(electronic.type){
            case 'Desktop':{
            return connection.insert(electronic.dimensions, 'dimension_id')
            .into('Dimensions')
            .transacting(trx)
            .then(function(dimensionsId){
            return connection.insert({
                'processor_type': electronic.processor_type,
                'ram_size': electronic.ram_size,
                'number_cpu_cores': electronic.number_cpu_cores,
                'harddrive_size': electronic.harddrive_size
            },'comp_id')
                .into('Computer')
                .transacting(trx)
                .then(function(compId){
                    return connection.insert({
                        'comp_id': compId,
                        'model_number': electronic.model_number,
                        'dimension_id': dimensionsId
                    }, 'id')
                    .into('Desktop')
                    .transacting(trx);
                });
            });
            };
            case 'Laptop': {} ;
            case 'Tablet': {} ;
            case 'Monitor': {} ;
            case 'TV': {} ;
            }
            })
        })
            .then(trx.commit)
            .catch(trx.rollback);
        
   });
}
   module.exports = {
    constructor: constructor,
    commit: commit,
    commitAll: commitAll,
  };
    

  
 