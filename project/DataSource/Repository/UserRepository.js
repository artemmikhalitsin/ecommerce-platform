'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get()
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

function save(user){
      database('User').insert(user)
        .then(user => {
          return true;
        })
        .catch(error => {
          return false;
        });
    };

module.exports = {
  save: save
}
