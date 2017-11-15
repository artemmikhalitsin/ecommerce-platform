'use strict';

var computers = [{
  'processor_type': 'productivity',
  'ram_size': 8869,
  'number_cpu_cores': 5,
  'harddrive_size': 620
}, {
  'processor_type': 'Re-contextualized',
  'ram_size': 4105,
  'number_cpu_cores': 11,
  'harddrive_size': 1757
}, {
  'processor_type': 'Robust',
  'ram_size': 3880,
  'number_cpu_cores': 6,
  'harddrive_size': 900
}, {
  'processor_type': 'Self-enabling',
  'ram_size': 5382,
  'number_cpu_cores': 7,
  'harddrive_size': 982
}, {
  'processor_type': 'Adaptive',
  'ram_size': 8727,
  'number_cpu_cores': 6,
  'harddrive_size': 1806
}, {
  'processor_type': 'multi-state',
  'ram_size': 5213,
  'number_cpu_cores': 4,
  'harddrive_size': 1232
}, {
  'processor_type': 'reciprocal',
  'ram_size': 4266,
  'number_cpu_cores': 9,
  'harddrive_size': 1129
}, {
  'processor_type': 'discrete',
  'ram_size': 4690,
  'number_cpu_cores': 11,
  'harddrive_size': 849
}];

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Computer').del().then(function () {
    // Inserts seed entries
    return knex('Computer').insert(computers);
  });
};