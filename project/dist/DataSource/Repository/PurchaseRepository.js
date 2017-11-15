/* eslint-disable */
// Eslint disabled for this file only until issue is resolved

'use strict';

// TODO: This repo is not even implemented as a class, and hence I did not
// document this. Should this be deleted? - Artem

var PurcheRepository = function PurcheRepository() {
  var express = require('express');
  var app = express();

  var environment = process.env.NODE_ENV || 'development';
  var configuration = require('./knexfile')[environment];
  var database = require('knex')(configuration);
};
PurcheRepository.prototype.save = function (purchase) {
  database('Purchase').insert(purchase).then(function (purchase) {
    res.status(200).json(purchase);
    return res.send(purchase);
  }).catch(function (error) {
    res.status(500).json({ error: error });
    return res.send(purchase);
  });
};