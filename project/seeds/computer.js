const computers = [/*{
  'comp_id': 246456,
  'processor_type': 'productivity',
  'ram_size': 8869,
  'number_cpu_cores': 5,
  'harddrive_size': 620,
} */
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Computer').del()
    .then(function() {
      // Inserts seed entries
      return knex('Computer').insert(computers);
    });
};
