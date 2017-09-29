'use strict';
const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

function save(desktop){
  database('Desktop').insert(desktop)
    .then(desktop => {
      res.status(200).json(desktop)
      return res.send(desktop);
    })
    .catch(error => {
      res.status(500).json({error});
      return res.send(desktop);
    });
};

module.exports = {
  save: save
}
