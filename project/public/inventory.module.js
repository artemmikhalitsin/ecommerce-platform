var adminInventory = angular.module('adminInventory', [])

adminInventory.controller('AdminController', function($scope) {
  $scope.items = [{
    serial_number: ['22'],
    model_number: '22',
    brand_name: "b",
    price: 1,
    weight: 1,
    type: 'Desktop',
    processor_type: 'r',
    ram_size: 1,
    number_cpu_cores: 2,
    harddrive_size: 3,
    dimensions: {depth: 1,
       height: 1,
       width: 1}
   },{
    serial_number: ['1234'],
    model_number: '61',
    brand_name: "changed",
    price: 1,
    weight: 1,
    type: 'Desktop',
    processor_type: 'q',
    ram_size: 1,
    number_cpu_cores: 2,
    harddrive_size: 3,
    dimensions: {depth: 1,
       height: 1,
       width: 1}
   },{
    serial_number: ['12', '14'],
    model_number: '62',
    brand_name: "b",
    price: 1,
    weight: 1,
    type: 'Desktop',
    processor_type: 'n',
    ram_size: 1,
    number_cpu_cores: 2,
    harddrive_size: 3,
    dimensions: {depth: 1,
       height: 1,
       width: 1}
   }];

   //Datatable setup
   var inventory_table = $('#table_inventory').DataTable({
     data: $scope.items,
     columns: [
       {
           'className': 'details-control',
           'orderable': false,
           'data': null,
           'defaultContent': '',
       },
       {'data': 'model_number'},
       {'data': 'brand_name'},
       {'data': 'price'},
       {'data': 'weight'},
       {'data': 'type'},
       {'data': 'is_available'},
     ],
   });

   $('#table_inventory tbody').on('click', 'td.details-control', function() {
       let tr = $(this).closest('tr');
       let row = inventory_table.row( tr );
       if ( row.child.isShown() ) {
           // This row is already open - close it
           row.child.hide();
           tr.removeClass('shown');
       } else {
           // Open this row
           let rowData = row.data();
           console.log("Printing type: ", rowData.type);
           row.child( formatChildRows(row.data()) ).show();
           tr.addClass('shown');
       }
   });
})
