'use strict';
const rootPath = require('app-root-dir').get();
const environment = process.env.NODE_ENV || 'development';
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

function save(laptop){
  database('Laptop').insert(laptop)
    .then(tv => {
      return true;
    })
    .catch(error => {
      return false;
    });
};

function get(args){
  return database('Laptop').select('*')
}

module.exports = {
  save: save,
  get: get
}