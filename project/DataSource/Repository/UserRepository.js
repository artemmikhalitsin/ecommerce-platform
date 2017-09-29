'use strict';

const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get()
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

function save(user){
      database('User').insert(user)
        .then(user => {
          return true;
        })
        .catch(error => {
          return false;
        });
    };

function authenticate(user){
  database('User').select(user).then(user => {
    console.log('works');
    return true;
  }).catch(error => {
    console.log('not working');
    return false;
  });
}

module.exports = {
  save: save
}
