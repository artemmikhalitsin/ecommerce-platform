'use strict';
var TVRepository = function(){
  const express = require('express');
  const app = express();

  const environment = process.env.NODE_ENV || 'development';
  const configuration = require('./knexfile')[environment];
  const database = require('knex')(configuration);

};
TVRepository.prototype.save = function(tv){

  database('TV').insert(tv)
    .then(tv => {
      res.status(200).json(tv)
      return res.send(tv);
    })
    .catch(error => {
      res.status(500).json({error});
      return res.send(tv);
    });
};
