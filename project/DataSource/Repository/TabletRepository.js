/* eslint-disable */
// Eslint disabled for this file only until issue is resolved

'use strict';
// TODO: This repo is not even implemented as a class, and hence I did not
// document this. Should this be deleted? - Artem

const rootPath = require('app-root-dir').get();
const environment = process.env.NODE_ENV || 'development';
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

    function save(tablet) {
      database('Tablet').insert(tablet)
        .then((tv) => {
          return true;
        })
        .catch((error) => {
          return false;
        });
    };

    function get(args) {
      return database('Tablet').select('*');
    }

    module.exports = {
      save: save,
      get: get,
    };
