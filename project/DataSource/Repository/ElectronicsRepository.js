/* eslint-disable */
// Eslint disabled for this file only until issue is resolved

'use strict';
// TODO: This repo is not even implemented as a class, and hence I did not
// document this. Should this be deleted? - Artem

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);
let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let uow = new UnitOfWork();

function save(object) {
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
