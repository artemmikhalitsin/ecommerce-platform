'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get()
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

function save(user){
      return database('User').insert(user)
    };

function get(){
      return database('User').select('*')
}
function authenticate(user){
  return database('User').where({
    email: user.email,
    password: user.password
  })
}

module.exports = {
  save: save,
  get: get,
  authenticate: authenticate
}