// Function used to populate the child rows for laptops table
function formatlaptopsChildRows( data ) {
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<td>Processor Type:</td>'+
          '<td>'+data.processor_type+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>RAM size:</td>'+
          '<td>'+data.ram_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td># of CPU cores:</td>'+
          '<td>'+data.number_cpu_cores+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Hard Drive size:</td>'+
          '<td>'+data.harddrive_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Display size:</td>'+
          '<td>'+data.display_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Battery Info:</td>'+
          '<td>'+data.battery_info+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>OS:</td>'+
          '<td>'+data.os+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Camera:</td>'+
          '<td>'+data.camera+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Touch Screen:</td>'+
          '<td>'+data.touch_screen+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Serial Numbers:</td>'+
          '<td>'+data.serial_numbers+'</td>'+
      '</tr>'+
  '</table>';
}

// Function used to populate the child rows for desktop table
function formatDesktopsChildRows( data ) {
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<td>Processor Type:</td>'+
          '<td>'+data.processor_type+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>RAM size:</td>'+
          '<td>'+data.ram_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td># of CPU cores:</td>'+
          '<td>'+data.number_cpu_cores+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Hard Drive size:</td>'+
          '<td>'+data.harddrive_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Height:</td>'+
          '<td>'+data.height+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Width:</td>'+
          '<td>'+data.width+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Depth:</td>'+
          '<td>'+data.depth+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Serial Numbers:</td>'+
          '<td>'+data.serial_numbers+'</td>'+
      '</tr>'+
  '</table>';
}

// Function used to populate the child rows for Monitor table
function formatMonitorsChildRows( data ) {
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<td>Display Size:</td>'+
          '<td>'+data.display_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Serial Numbers:</td>'+
          '<td>'+data.serial_numbers+'</td>'+
      '</tr>'+
  '</table>';
}

// Function used to populate the child rows for TV table
function formatTVsChildRows( data ) {
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<td>Height:</td>'+
          '<td>'+data.category_name+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Height:</td>'+
          '<td>'+data.height+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Width:</td>'+
          '<td>'+data.width+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Depth:</td>'+
          '<td>'+data.depth+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Serial Numbers:</td>'+
          '<td>'+data.serial_numbers+'</td>'+
      '</tr>'+
  '</table>';
}

// Function used to populate the child rows for tablets table
function formatTabletsChildRows( data ) {
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<td>Processor Type:</td>'+
          '<td>'+data.processor_type+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>RAM size:</td>'+
          '<td>'+data.ram_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td># of CPU cores:</td>'+
          '<td>'+data.number_cpu_cores+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Hard Drive size:</td>'+
          '<td>'+data.harddrive_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Display size:</td>'+
          '<td>'+data.display_size+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Battery Info:</td>'+
          '<td>'+data.battery_info+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>OS:</td>'+
          '<td>'+data.os+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Height:</td>'+
          '<td>'+data.height+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Width:</td>'+
          '<td>'+data.width+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Depth:</td>'+
          '<td>'+data.depth+'</td>'+
      '</tr>'+
          '<td>Camera:</td>'+
          '<td>'+data.camera_info+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Serial Numbers:</td>'+
          '<td>'+data.serial_numbers+'</td>'+
      '</tr>'+
  '</table>';
}

$(document).ready(function() {
    let inventory_table = $('#table_inventory').DataTable({
      data: mock,
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
            switch (rowData.type) {
              case 'Laptop':
                row.child( formatlaptopsChildRows(row.data()) ).show();break;
              case 'Desktop':
                row.child( formatDesktopsChildRows(row.data()) ).show();break;
              case 'Monitor':
                row.child( formatMonitorsChildRows(row.data()) ).show();break;
              case 'TV':
                row.child( formatTVsChildRows(row.data()) ).show();break;
              case 'Tablet':
                row.child( formatTabletsChildRows(row.data()) ).show();break;
              default:
            }
            tr.addClass('shown');
        }
    });
});
