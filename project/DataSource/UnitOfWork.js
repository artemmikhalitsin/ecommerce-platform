
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
   module.exports = {
    constructor: constructor,
    commit: commit,
  };
    