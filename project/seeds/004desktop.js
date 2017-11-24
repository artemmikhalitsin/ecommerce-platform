/**
 * Seeding the Desktop table with some data
 * @author Ajmer Singh Gadreh
 */
const desktops = [
  {
    "model_number": "913871307-1",
    "comp_id": 1,
    "dimension_id": 1
  },
  {
    "model_number": "847616645-1",
    "comp_id": 2,
    "dimension_id": 2
  },
  {
    "model_number": "937548440-8",
    "comp_id": 3,
    "dimension_id": 3
  }
];


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Desktop').del()
    .then(function() {
      // Inserts seed entries
      return knex('Desktop').insert(desktops);
    });
};
