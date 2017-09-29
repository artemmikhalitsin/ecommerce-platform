'use strict';
var InventoryItemRepository = function(){
  const express = require('express');
  const app = express();

  const environment = process.env.NODE_ENV || 'development';
  const configuration = require('./knexfile')[environment];
  const database = require('knex')(configuration);

  
};
InventoryItemRepository.prototype.save = function(inventoryItem){

  database('InventoryItem').insert(inventoryItem)
    .then(inventoryItem => {
      res.status(200).json(inventoryItem)
      return res.send(inventoryItem);
    })
    .catch(error => {
      res.status(500).json({error});
      return res.send(inventoryItem);
    });
}
