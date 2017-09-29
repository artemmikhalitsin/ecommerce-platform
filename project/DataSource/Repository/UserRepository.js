'use strict';
var UserRepository = function(){
  const express = require('express');
  const app = express();

  const environment = process.env.NODE_ENV || 'development';
  const configuration = require('./knexfile')[environment];
  const database = require('knex')(configuration);

  
};
UserRepository.prototype.save = function(user){
  
      database('User').insert(user)
        .then(user => {
          res.status(200).json(user)
          return res.send(user);
        })
        .catch(error => {
          res.status(500).json({user});
          return res.send(user);
        });
    };