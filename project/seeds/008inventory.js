const items = [
  {
    'serialNumber': 'EK22-B7QU-KYKL-GHA6',
    'modelNumber': '913871307-1'
  },
  {
    'serialNumber': 'B5PU-EEZX-MLVH-D8PF',
    'modelNumber': '913871307-1'
  },
  {
    'serialNumber': 'MLEN-RXVR-UTBP-TL6M',
    'modelNumber': '913871307-1'
  },
  {
    'serialNumber': 'Q4JT-LNWJ-L5AB-MC2D',
    'modelNumber': '913871307-1'
  },
  {
    'serialNumber': 'KFNZ-VKHH-HUTF-YQVR',
    'modelNumber': '913871307-1'
  },
  {
    'serialNumber': 'AQ8F-P8U4-DT2J-7YR7',
    'modelNumber': '847616645-1'
  },
  {
    'serialNumber': '4DDJ-PU2J-U8HJ-6CX5',
    'modelNumber': '847616645-1'
  },
  {
    'serialNumber': 'KY8V-QP65-P6A4-CHYT',
    'modelNumber': '511703112-1'
  },
  {
    'serialNumber': '8F6P-8AFX-DD6N-8R57',
    'modelNumber': '425528356-7'
  },
  {
    'serialNumber': 'J5AQ-4NQ6-MBKN-96DW',
    'modelNumber': '425528356-7'
  },
  {
    'serialNumber': 'EE5U-VCJ7-HJ3G-CW4R',
    'modelNumber': '891507686-9'
  },
  {
    'serialNumber': 'CRAJ-4MV5-VSYY-FUWT',
    'modelNumber': '891507686-9'
  },
  {
    'serialNumber': 'HHV8-B52E-YGA7-HSSH',
    'modelNumber': '079057815-8'
  },
  {
    'serialNumber': 'J6GJ-S4R6-RNWN-KJV2',
    'modelNumber': '471262598-8'
  },
  {
    'serialNumber': '25YN-5KEX-46CX-CS4E',
    'modelNumber': '937548440-8'
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Inventory').del()
    .then(function() {
      // Inserts seed entries
      return knex('Inventory').insert(items);
    });
};
