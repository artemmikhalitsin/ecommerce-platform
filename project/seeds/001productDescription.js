const productDescriptions = [
  {
    'model_number': '913871307-1',
    'brand_name': 'HP',
    'price': 74,
    'weight': 19,
    'type': 'Desktop',
    'is_available': false,
  },
  {
    'model_number': '847616645-1',
    'brand_name': 'Dell',
    'price': 100,
    'weight': 34,
    'type': 'Desktop',
    'is_available': true,
  },
  {
    'model_number': '141278542-1',
    'brand_name': 'Dell',
    'price': 35,
    'weight': 59,
    'type': 'Monitor',
    'is_available': true,
  },
  {
    'model_number': '511703112-1',
    'brand_name': 'HP',
    'price': 49,
    'weight': 87,
    'type': 'Monitor',
    'is_available': false,
  },
  {
    'model_number': '425528356-7',
    'brand_name': 'Apple',
    'price': 27,
    'weight': 95,
    'type': 'Tablet',
    'is_available': false,
  },
  {
    'model_number': '847042583-8',
    'brand_name': 'Samsung',
    'price': 69,
    'weight': 45,
    'type': 'Tablet',
    'is_available': false,
  },
  {
    'model_number': '891507686-9',
    'brand_name': 'Asus',
    'price': 18,
    'weight': 7,
    'type': 'Laptop',
    'is_available': false,
  },
  {
    'model_number': '079057815-8',
    'brand_name': 'Acer',
    'price': 22,
    'weight': 97,
    'type': 'Laptop',
    'is_available': true,
  },
  {
    'model_number': '471262598-8',
    'brand_name': 'Razer',
    'price': 75,
    'weight': 79,
    'type': 'Laptop',
    'is_available': false,
  },
  {
    'model_number': '937548440-8',
    'brand_name': 'Acer',
    'price': 42,
    'weight': 4,
    'type': 'Desktop',
    'is_available': true,
  },
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ProductDescription').del()
    .then(function() {
      // Inserts seed entries
      return knex('ProductDescription').insert(productDescriptions);
    });
};
