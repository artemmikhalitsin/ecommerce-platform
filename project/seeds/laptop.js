const laptops = [
  /*{
  'id': 123,
  'comp_id':1435234,
  'model_number':'23452',
  'display_size': 67,
  'battery_info': 'integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices',
  'os': 'elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus',
  'touch_screen': false,
  'camera': true,
}
*/
];
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Laptop').del()
    .then(function() {
      // Inserts seed entries
      return knex('Laptop').insert(laptops);
    });
};
