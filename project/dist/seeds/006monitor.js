'use strict';

var monitors = [{
  'model_number': '141278542-1',
  'display_size': 32
}, {
  'model_number': '511703112-1',
  'display_size': 40
}];

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Monitor').del().then(function () {
    // Inserts seed entries
    return knex('Monitor').insert(monitors);
  });
};