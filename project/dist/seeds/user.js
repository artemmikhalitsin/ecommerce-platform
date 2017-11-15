'use strict';

var users = [{
  'first_name': 'Admin',
  'last_name': 'Admin',
  'email': 'admin@admin.com',
  'full_address': '123 Main Street',
  'is_admin': true,
  'phone_number': '1234567890',
  'password': '123'
}, {
  'first_name': 'Wai',
  'last_name': 'Lun Lau',
  'email': 'wl.wailau@gmail.com',
  'full_address': '123 Main Street',
  'is_admin': true,
  'phone_number': '1234567890',
  'password': 'password'
}, {
  'first_name': 'Constantinos',
  'last_name': 'Constantinides',
  'email': 'cc@cse.concordia.ca',
  'full_address': '123 Main Street',
  'is_admin': true,
  'phone_number': '1234567890',
  'password': 'password'
}];

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del().then(function () {
    // Inserts seed entries
    return knex('User').insert(users);
  });
};