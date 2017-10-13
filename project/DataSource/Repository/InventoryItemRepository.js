'use strict';
const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

function save(inventoryItem) {
  database('InventoryItem').insert(inventoryItem)
    .then((inventoryItem) => {
      res.status(200).json(inventoryItem);
      return res.send(inventoryItem);
    })
    .catch((error) => {
      res.status(500).json({error});
      return res.send(inventoryItem);
    });
};

function get(args) {
  return database('inventoryItem').select('*');
}

module.exports = {
  save: save,
  get: get,
};
