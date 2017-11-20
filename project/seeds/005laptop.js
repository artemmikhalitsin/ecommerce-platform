const laptops = [
  {
    'model_number': '891507686-9',
    'comp_id': 4,
    'display_size': 67,
    'battery_info': 'integer a nibh',
    'os': 'elit proin',
    'touch_screen': false,
    'camera': true,
  },
  {
    'model_number': '079057815-8',
    'comp_id': 5,
    'display_size': 65,
    'battery_info': 'integer fwsd frdgt',
    'os': 'elit ksthvd wrycnd',
    'touch_screen': false,
    'camera': true,
  },
  {
    'model_number': '471262598-8',
    'comp_id': 6,
    'display_size': 70,
    'battery_info': 'integer b sdfrg iskfe',
    'os': 'elits rdwfr gtde',
    'touch_screen': true,
    'camera': true,
  },
];
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Laptop').del()
    .then(function() {
      // Inserts seed entries
      return knex('Laptop').insert(laptops);
    });
};
