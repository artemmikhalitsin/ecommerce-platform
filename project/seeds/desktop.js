const desktops = [{
  "model_number": "221872712-9",
  "brand_name": "sit amet eros",
  "price": 112.34,
  "weight": 420.7,
  "processor_type": "productivity",
  "ram_size": 8869,
  "number_cpu_cores": 5,
  "harddrive_size": 620,
  "depth": 171,
  "height": 128,
  "width": 55
}, {
  "model_number": "898252034-1",
  "brand_name": "ornare",
  "price": 461.95,
  "weight": 128.36,
  "processor_type": "Re-contextualized",
  "ram_size": 4105,
  "number_cpu_cores": 11,
  "harddrive_size": 1757,
  "depth": 154,
  "height": 164,
  "width": 194
}, {
  "model_number": "063407976-X",
  "brand_name": "porta volutpat erat",
  "price": 450.41,
  "weight": 69.03,
  "processor_type": "Robust",
  "ram_size": 3880,
  "number_cpu_cores": 6,
  "harddrive_size": 900,
  "depth": 265,
  "height": 221,
  "width": 224
}, {
  "model_number": "084489284-X",
  "brand_name": "congue etiam",
  "price": 429.28,
  "weight": 284.28,
  "processor_type": "Self-enabling",
  "ram_size": 5382,
  "number_cpu_cores": 7,
  "harddrive_size": 982,
  "depth": 129,
  "height": 160,
  "width": 300
}, {
  "model_number": "067748844-0",
  "brand_name": "consequat varius",
  "price": 367.6,
  "weight": 159.62,
  "processor_type": "Adaptive",
  "ram_size": 8727,
  "number_cpu_cores": 6,
  "harddrive_size": 1806,
  "depth": 283,
  "height": 290,
  "width": 248
}, {
  "model_number": "312570073-6",
  "brand_name": "fermentum",
  "price": 384.48,
  "weight": 360.01,
  "processor_type": "multi-state",
  "ram_size": 5213,
  "number_cpu_cores": 4,
  "harddrive_size": 1232,
  "depth": 131,
  "height": 207,
  "width": 203
}, {
  "model_number": "354338621-2",
  "brand_name": "sagittis",
  "price": 150.02,
  "weight": 233.64,
  "processor_type": "reciprocal",
  "ram_size": 4266,
  "number_cpu_cores": 9,
  "harddrive_size": 1129,
  "depth": 197,
  "height": 113,
  "width": 69
}, {
  "model_number": "809031536-4",
  "brand_name": "porttitor",
  "price": 279.49,
  "weight": 344.13,
  "processor_type": "discrete",
  "ram_size": 4690,
  "number_cpu_cores": 11,
  "harddrive_size": 849,
  "depth": 249,
  "height": 293,
  "width": 297
}, {
  "model_number": "647645565-6",
  "brand_name": "in faucibus orci",
  "price": 340.23,
  "weight": 265.87,
  "processor_type": "tertiary",
  "ram_size": 4114,
  "number_cpu_cores": 10,
  "harddrive_size": 1722,
  "depth": 65,
  "height": 255,
  "width": 104
}, {
  "model_number": "587727516-X",
  "brand_name": "ut at dolor",
  "price": 358.33,
  "weight": 476.21,
  "processor_type": "ability",
  "ram_size": 4068,
  "number_cpu_cores": 10,
  "harddrive_size": 1640,
  "depth": 127,
  "height": 226,
  "width": 284
}]


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Desktop').del()
    .then(function () {
      // Inserts seed entries
      return knex('Desktop').insert(desktops);
    });
};
