const tvs = [{
  "model_number": "357426916-1",
  "brand_name": "lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet",
  "price": "$4.34",
  "weight": 72,
  "depth": 63,
  "height": 87,
  "width": 62
}, {
  "model_number": "856366601-0",
  "brand_name": "vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur",
  "price": "$5.13",
  "weight": 97,
  "depth": 37,
  "height": 39,
  "width": 47
}, {
  "model_number": "820247445-0",
  "brand_name": "lectus suspendisse potenti in eleifend quam a odio in hac habitasse",
  "price": "$6.06",
  "weight": 34,
  "depth": 3,
  "height": 30,
  "width": 18
}, {
  "model_number": "172246229-9",
  "brand_name": "et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis",
  "price": "$5.90",
  "weight": 86,
  "depth": 45,
  "height": 8,
  "width": 37
}, {
  "model_number": "586042672-0",
  "brand_name": "diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci",
  "price": "$8.59",
  "weight": 28,
  "depth": 97,
  "height": 50,
  "width": 47
}, {
  "model_number": "069478951-8",
  "brand_name": "vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat",
  "price": "$7.05",
  "weight": 20,
  "depth": 50,
  "height": 92,
  "width": 93
}, {
  "model_number": "655803262-7",
  "brand_name": "vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod",
  "price": "$9.05",
  "weight": 57,
  "depth": 39,
  "height": 60,
  "width": 5
}, {
  "model_number": "188304254-2",
  "brand_name": "ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla",
  "price": "$4.54",
  "weight": 38,
  "depth": 14,
  "height": 26,
  "width": 26
}, {
  "model_number": "842350288-0",
  "brand_name": "lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet",
  "price": "$6.78",
  "weight": 55,
  "depth": 98,
  "height": 34,
  "width": 32
}, {
  "model_number": "471284204-0",
  "brand_name": "et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor",
  "price": "$7.20",
  "weight": 54,
  "depth": 30,
  "height": 68,
  "width": 22
}, {
  "model_number": "141895238-9",
  "brand_name": "etiam pretium iaculis justo in hac habitasse platea dictumst etiam",
  "price": "$8.03",
  "weight": 81,
  "depth": 31,
  "height": 79,
  "width": 63
}, {
  "model_number": "755082609-9",
  "brand_name": "quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum",
  "price": "$9.74",
  "weight": 64,
  "depth": 64,
  "height": 91,
  "width": 89
}, {
  "model_number": "864025480-X",
  "brand_name": "in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea",
  "price": "$2.46",
  "weight": 27,
  "depth": 67,
  "height": 73,
  "width": 23
}, {
  "model_number": "815933163-0",
  "brand_name": "platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer",
  "price": "$5.42",
  "weight": 19,
  "depth": 55,
  "height": 36,
  "width": 46
}, {
  "model_number": "429168365-0",
  "brand_name": "orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu",
  "price": "$0.19",
  "weight": 51,
  "depth": 40,
  "height": 24,
  "width": 7
}]
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('TV').del()
    .then(function () {
      // Inserts seed entries
      return knex('TV').insert(tvs);
    });
};