const productDescriptions = [
  /*{
  'model_number' : '234rfs',
  'brand_name': '23e',
  'price':23,
  'weight':23,
  'is_available': true
}
*/
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ProductDescription').del()
    .then(function() {
      // Inserts seed entries
      return knex('ProductDescription').insert(productDescriptions);
    });
};
