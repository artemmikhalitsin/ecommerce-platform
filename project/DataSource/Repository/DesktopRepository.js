'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get()
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

function save(desktop){
  console.log(desktop)
  return database('Desktop').insert(desktop);
};

module.exports = {
  save: save
}
