/* eslint-disable */
// Eslint disabled for this file only until issue is resolved

'use strict';

// TODO: This repo is not even implemented as a class, and hence I did not
// document this. Should this be deleted? - Artem

let PurcheRepository = function() {
  const express = require('express');
  const app = express();

  const environment = process.env.NODE_ENV || 'development';
  const configuration = require('./knexfile')[environment];
  const database = require('knex')(configuration);
};
PurcheRepository.prototype.save = function(purchase) {
      database('Purchase').insert(purchase)
        .then((purchase) => {
          res.status(200).json(purchase);
          return res.send(purchase);
        })
        .catch((error) => {
          res.status(500).json({error});
          return res.send(purchase);
        });
    };
