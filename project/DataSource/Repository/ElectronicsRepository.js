'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
var uow = require(rootPath + '/DataSource/UnitOfWork.js');

function constructor(uow){
  this.uow = uow;
}

function save(object){
  return uow.commit(object);
}
function get(args) {
  return database('Desktop').select('*');
}

module.exports = {
  constructor: constructor,
  save: save,
  get: get,
};
