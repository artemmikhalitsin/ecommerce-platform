const computers = [
  {
    'processorType': 'productivity',
    'ramSize': 8869,
    'numberCpuCores': 5,
    'hardDriveSize': 620
  },
  {
    'processorType': 'Re-contextualized',
    'ramSize': 4105,
    'numberCpuCores': 11,
    'hardDriveSize': 1757
  },
  {
    'processorType': 'Robust',
    'ramSize': 3880,
    'numberCpuCores': 6,
    'hardDriveSize': 900
  },
  {
    'processorType': 'Self-enabling',
    'ramSize': 5382,
    'numberCpuCores': 7,
    'hardDriveSize': 982
  },
  {
    'processorType': 'Adaptive',
    'ramSize': 8727,
    'numberCpuCores': 6,
    'hardDriveSize': 1806
  },
  {
    'processorType': 'multi-state',
    'ramSize': 5213,
    'numberCpuCores': 4,
    'hardDriveSize': 1232
  },
  {
    'processorType': 'reciprocal',
    'ramSize': 4266,
    'numberCpuCores': 9,
    'hardDriveSize': 1129
  },
  {
    'processorType': 'discrete',
    'ramSize': 4690,
    'numberCpuCores': 11,
    'hardDriveSize': 849
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Computer').del()
    .then(function() {
      // Inserts seed entries
      return knex('Computer').insert(computers);
    });
};
