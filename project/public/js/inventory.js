// Event listener for opening and closing details of a row
function openCloseDetails(table_id, tableObject, type) {
  $('#' + table_id + ' tbody').on('click', 'td.details-control', function() {
      let tr = $(this).closest('tr');
      let row = tableObject.row( tr );

      if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      } else {
          // Open this row
          switch (type) {
            case 'Laptop':
              row.child( formatlaptopsTable(row.data()) ).show();break;
            case 'Desktop':
              row.child( formatDesktopsTable(row.data()) ).show();break;
            case 'TV':
            case 'Monitor':
              row.child( formatTVsAndMonitorsTable(row.data()) ).show();break;
            case 'Tablet':
              row.child( formatTabletsTable(row.data()) ).show();break;
            default:
          }
          tr.addClass('shown');
      }
  });
}

// Function used to populate the child rows for laptops table
function formatlaptopsTable( data ) {
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
  '</table>';
}

// Function used to populate the child rows for desktop table
function formatDesktopsTable( data ) {
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
  '</table>';
}

// Function used to populate the child rows for TVs and monitors tables
function formatTVsAndMonitorsTable( data ) {
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
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
  '</table>';
}

// Function used to populate the child rows for tablets table
function formatTabletsTable( data ) {
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
    // if (mock[0].type == "Desktop") {
    //   openCloseDetails('table_laptops', laptops_table, mock[0].type);
    // }
    // for (var i = 0; i < mock.length; i++) {
    //   console.log(mock[i].type);
    //   if (mock[i].type == "Desktop") {
    //     openCloseDetails('table_laptops', laptops_table, mock[i].type);
    //   }else if (mock[i].type == "Laptop") {
    //     openCloseDetails('table_laptops', laptops_table, mock[i].type);
    //   }else {
    //     console.log("another table");
    //   }
    // }
    //console.log(mock.length);
    //openCloseDetails('table_laptops', laptops_table);
/*
    let desktops_table = $('#table_desktops').DataTable({
      data: mock.desks,
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
        {'data': 'is_available'},
      ],
    });
    openCloseDetails('table_desktops', desktops_table);

    let tvs_table = $('#table_tvs').DataTable({
      data: mock.tvs,
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
        {'data': 'category_name'},
        {'data': 'is_available'},
      ],
    });
    openCloseDetails('table_tvs', tvs_table);

    let monitors_table = $('#table_monitors').DataTable({
      data: mock.mons,
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
        {'data': 'is_available'},
      ],
    });
    openCloseDetails('table_monitors', monitors_table);

    let tablets_table = $('#table_tablets').DataTable({
      data: mock.tabs,
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
        {'data': 'is_availble'},
      ],
    });
    openCloseDetails('table_tablets', tablets_table);
    */
});
