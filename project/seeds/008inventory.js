/**
 * Sedding the Inventory table with some items
 * @author Ajmer Singh Gadreh
 */
const items = [
  {
    'serial_number': 'EK22-B7QU-KYKL-GHA6',
    'model_number': '913871307-1'
  },
  {
    'serial_number': 'B5PU-EEZX-MLVH-D8PF',
    'model_number': '913871307-1'
  },
  {
    'serial_number': 'MLEN-RXVR-UTBP-TL6M',
    'model_number': '913871307-1'
  },
  {
    'serial_number': 'Q4JT-LNWJ-L5AB-MC2D',
    'model_number': '913871307-1'
  },
  {
    'serial_number': 'KFNZ-VKHH-HUTF-YQVR',
    'model_number': '913871307-1'
  },
  {
    'serial_number': 'AQ8F-P8U4-DT2J-7YR7',
    'model_number': '847616645-1'
  },
  {
    'serial_number': '4DDJ-PU2J-U8HJ-6CX5',
    'model_number': '847616645-1'
  },
  {
    'serial_number': 'KY8V-QP65-P6A4-CHYT',
    'model_number': '511703112-1'
  },
  {
    'serial_number': '8F6P-8AFX-DD6N-8R57',
    'model_number': '425528356-7'
  },
  {
    'serial_number': 'J5AQ-4NQ6-MBKN-96DW',
    'model_number': '425528356-7'
  },
  {
    'serial_number': 'EE5U-VCJ7-HJ3G-CW4R',
    'model_number': '891507686-9'
  },
  {
    'serial_number': 'CRAJ-4MV5-VSYY-FUWT',
    'model_number': '891507686-9'
  },
  {
    'serial_number': 'HHV8-B52E-YGA7-HSSH',
    'model_number': '079057815-8'
  },
  {
    'serial_number': 'J6GJ-S4R6-RNWN-KJV2',
    'model_number': '471262598-8'
  },
  {
    'serial_number': '25YN-5KEX-46CX-CS4E',
    'model_number': '937548440-8'
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
