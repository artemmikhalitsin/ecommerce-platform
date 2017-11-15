/* eslint-disable */
// Eslint disabled for this file only until issue is resolved

'use strict';
// TODO: This repo is not even implemented as a class, and hence I did not
// document this. Should this be deleted? - Artem

var environment = process.env.NODE_ENV || 'development';
var rootPath = require('app-root-dir').get();
var configuration = require(rootPath + '/knexfile')[environment];
var database = require('knex')(configuration);
var UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
var uow = new UnitOfWork();

function save(object) {
  return uow.commit(object);
}
function get(args) {
  return database('Desktop').select('*');
}

module.exports = {
  constructor: constructor,
  save: save,
  get: get
};