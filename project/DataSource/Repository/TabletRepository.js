'use strict';
var TabletRepository = function(){
  const express = require('express');
  const app = express();
const rootPath = require('app-root-dir').get();
  const environment = process.env.NODE_ENV || 'development';
  const configuration = require(rootPath + '/knexfile')[environment];
  const database = require('knex')(configuration);


};
TabletRepository.prototype.save = function(tablet){

      database('Tablet').insert(tablet)
        .then(tablet => {
          res.status(200).json(tabelt)
          return res.send(tv);
        })
        .catch(error => {
          res.status(500).json({error});
          return res.send(tablet);
        });
    }
