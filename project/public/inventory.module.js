var adminInventory = angular.module('adminInventory', [])

adminInventory.controller('AdminController', function($scope) {
  $scope.items = [{
    serialNumber: ['22'],
    modelNumber: '22',
    brandName: "b",
    price: 1,
    weight: 1,
    type: 'Desktop',
    processorType: 'r',
    ramSize: 1,
    numberCpuCores: 2,
    hardDriveSize: 3,
    dimensions: {depth: 1,
       height: 1,
       width: 1}
   },{
    serialNumber: ['1234'],
    modelNumber: '61',
    brandName: "changed",
    price: 1,
    weight: 1,
    type: 'Desktop',
    processorType: 'q',
    ramSize: 1,
    numberCpuCores: 2,
    hardDriveSize: 3,
    dimensions: {depth: 1,
       height: 1,
       width: 1}
   },{
    serialNumber: ['12', '14'],
    modelNumber: '62',
    brandName: "b",
    price: 1,
    weight: 1,
    type: 'Desktop',
    processorType: 'n',
    ramSize: 1,
    numberCpuCores: 2,
    hardDriveSize: 3,
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
       {'data': 'modelNumber'},
       {'data': 'brandName'},
       {'data': 'price'},
       {'data': 'weight'},
       {'data': 'type'},
       {'data': 'isAvailable'},
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
