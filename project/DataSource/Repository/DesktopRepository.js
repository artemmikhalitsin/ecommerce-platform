'use strict';
const express = require('express');
const app = express();
const rootPath = require('app-root-dir').get();
const environment = process.env.NODE_ENV || 'development';
const configuration = require(rootPath + '/knexfile')[environment];

const database = require('knex')(configuration);

function save(desktop){
  database('Desktop').insert(desktop)
    .then(desktop => {
      res.status(200).json(desktop)
      return res.send(desktop);
    })
    .catch(error => {
      res.status(500).json({error});
      return res.send(desktop);
    });
};

function get(args){
  return database('Desktop').select('*')
}

module.exports = {
  save: save,
  get: get
}
