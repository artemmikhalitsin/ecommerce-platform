'use strict';
let ShoppingCartItemRepository = function() {
  const express = require('express');
  const app = express();

  const environment = process.env.NODE_ENV || 'development';
  const configuration = require('./knexfile')[environment];
  const database = require('knex')(configuration);
};
ShoppingCartItemRepository.prototype.save = function(shoppingCartItem) {
      database('ShoppingCartItem').insert(shoppingCartItem)
        .then((shoppingCartItem) => {
          res.status(200).json(shoppingCartItem);
          return res.send(shoppingCartItem);
        })
        .catch((error) => {
          res.status(500).json({error});
          return res.send(shoppingCartItem);
        });
    };
