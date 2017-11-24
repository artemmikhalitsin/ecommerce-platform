const productDescriptions = [
  {
    "modelNumber": "913871307-1",
    "brandName": "HP",
    "price": 74,
    "weight": 19,
    "type": "Desktop",
    "isAvailable": false
  },
  {
    "modelNumber": "847616645-1",
    "brandName": "Dell",
    "price": 100,
    "weight": 34,
    "type": "Desktop",
    "isAvailable": true
  },
  {
    "modelNumber": "141278542-1",
    "brandName": "Dell",
    "price": 35,
    "weight": 59,
    "type": "Monitor",
    "isAvailable": true
  },
  {
    "modelNumber": "511703112-1",
    "brandName": "HP",
    "price": 49,
    "weight": 87,
    "type": "Monitor",
    "isAvailable": false
  },
  {
    "modelNumber": "425528356-7",
    "brandName": "Apple",
    "price": 27,
    "weight": 95,
    "type": "Tablet",
    "isAvailable": false
  },
  {
    "modelNumber": "847042583-8",
    "brandName": "Samsung",
    "price": 69,
    "weight": 45,
    "type": "Tablet",
    "isAvailable": false
  },
  {
    "modelNumber": "891507686-9",
    "brandName": "Asus",
    "price": 18,
    "weight": 7,
    "type": "Laptop",
    "isAvailable": false
  },
  {
    "modelNumber": "079057815-8",
    "brandName": "Acer",
    "price": 22,
    "weight": 97,
    "type": "Laptop",
    "isAvailable": true
  },
  {
    "modelNumber": "471262598-8",
    "brandName": "Razer",
    "price": 75,
    "weight": 79,
    "type": "Laptop",
    "isAvailable": false
  },
  {
    "modelNumber": "937548440-8",
    "brandName": "Acer",
    "price": 42,
    "weight": 4,
    "type": "Desktop",
    "isAvailable": true
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ProductDescription').del()
    .then(function() {
      // Inserts seed entries
      return knex('ProductDescription').insert(productDescriptions);
    });
};
