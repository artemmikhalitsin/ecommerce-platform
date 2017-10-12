'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
var uow = require(rootPath + '/DataSource/UnitOfWork.js');

function constructor(uow){
  this.uow = uow;
}

function save(desktop) {
  //return database('Desktop').insert(desktop);
  return uow.commit(desktop, 'Desktop');
};
function save2(object){
  return uow.commit(object, 'Desktop');
}
function get(args) {
  return database('Desktop').select('*');
}

module.exports = {
  constructor: constructor,
  save: save,
  get: get,
  save2: save2,
};
