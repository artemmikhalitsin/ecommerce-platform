'use strict';

const express = require('express');
const app = express();
const rootPath = require('app-root-dir').get();
const environment = process.env.NODE_ENV || 'development';
const configuration = require(rootPath + '/knexfile')[environment];
const database = require('knex')(configuration);

function save(laptop){
      database('Laptop').insert(laptop)
        .then(laptop => {
          res.status(200).json(laptop)
          return res.send(laptop);
        })
        .catch(error => {
          res.status(500).json({error});
          return res.send(laptop);
        });
    };

module.exports = {
  save: save
}
