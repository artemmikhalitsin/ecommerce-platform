'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

function save(desktop) {
  return database('Desktop').insert(desktop) .then( function (result) {
    result.json({ success: true, message: 'ok' });     // respond back to request
 });
};

function get(args) {
  return database('Desktop').select('*');
}

module.exports = {
  save: save,
  get: get,
};
