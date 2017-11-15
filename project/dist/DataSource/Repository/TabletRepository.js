/* eslint-disable */
// Eslint disabled for this file only until issue is resolved

'use strict';
// TODO: This repo is not even implemented as a class, and hence I did not
// document this. Should this be deleted? - Artem

var rootPath = require('app-root-dir').get();
var environment = process.env.NODE_ENV || 'development';
var configuration = require(rootPath + '/knexfile')[environment];
var database = require('knex')(configuration);

function save(tablet) {
  database('Tablet').insert(tablet).then(function (tv) {
    return true;
  }).catch(function (error) {
    return false;
  });
};

function get(args) {
  return database('Tablet').select('*');
}

module.exports = {
  save: save,
  get: get
};