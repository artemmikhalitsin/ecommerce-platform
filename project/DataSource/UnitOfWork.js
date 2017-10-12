
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
var Promise = require('bluebird');

    function constructor(connection) {
       this.connection = connection;
    }
    
   function commit(object, tableName){
       connection.transaction(function(trx){
            connection.insert(object)
                    .insert(tableName)
                    .transacting(trx)
                    /*.then(function(){
                        //do something here
                    }) */
                    .then(trx.commit)
                    .catch(trx.rollback);
       })
       .then(function(res){
           //worked
           console.log("in then");
           //return res;
       })
       .catch(function(e){
           //failed
       });
   }
   module.exports = {
    constructor: constructor,
    commit: commit,
  };
    