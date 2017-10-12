
const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
var Promise = require('bluebird');

    function constructor(connection) {
       this.connection = connection;
    }
    
   function commit(object, tableName){
       return connection.transaction(function(trx){
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
    