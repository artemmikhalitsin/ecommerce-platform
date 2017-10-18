'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let uow = new UnitOfWork();

function save(desktop) {
  // return database('Desktop').insert(desktop);
  return uow.commit(desktop, 'Desktop');
};
function save2(object) {
  return uow.commitAll(object);
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
