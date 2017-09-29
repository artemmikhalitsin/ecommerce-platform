'use strict';
var MonitorRepository = function(){
  const express = require('express');
  const app = express();

  const environment = process.env.NODE_ENV || 'development';
  const configuration = require('./knexfile')[environment];
  const database = require('knex')(configuration);

  
};
MonitorRepository.prototype.save = function(monitor){
  
      database('Monitor').insert(tv)
        .then(monitor => {
          res.status(200).json(tv)
          return res.send(tv);
        })
        .catch(error => {
          res.status(500).json({error});
          return res.send(tv);
        });
    };
