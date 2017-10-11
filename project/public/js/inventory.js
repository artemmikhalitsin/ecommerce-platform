

// Function used to populate the child rows
function format ( data ) {
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
$(document).ready(function() {
    let table = $('#table_laptops').DataTable({
      data: mock.laptops,
      columns: [
        {
            "className":      'details-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": ''
        },
        { 'data': 'model_number'},
        { 'data': 'brand_name'},
        { 'data': 'price'},
        { 'data': 'weight'},
        { 'data': 'is_available'},
      ]
    });
    // Add event listener for opening and closing details
    $('#table_laptops tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
    $('#table_desktops').DataTable({
      data: mock.desks,
      columns: [
        { 'data': 'model_number'},
        { 'data': 'brand_name'},
        { 'data': 'price'},
        { 'data': 'weight'},
        { 'data': 'is_available'},
        { 'data': 'processor_type'},
        { 'data': 'ram_size'},
        { 'data': 'number_cpu_cores'},
        { 'data': 'harddrive_size'},
        { 'data': 'height'},
        { 'data': 'width'},
        { 'data': 'depth'},
      ]
    });
    $('#table_tvs').DataTable({
      data: mock.tvs,
      columns: [
        { 'data': 'model_number'},
        { 'data': 'brand_name'},
        { 'data': 'price'},
        { 'data': 'weight'},
        { 'data': 'category_name'},
        { 'data': 'is_available'},
        { 'data': 'height'},
        { 'data': 'width'},
        { 'data': 'depth'},
      ]
    });
    $('#table_monitors').DataTable({
      data: mock.mons,
      columns: [
        { 'data': 'model_number'},
        { 'data': 'brand_name'},
        { 'data': 'price'},
        { 'data': 'weight'},
        { 'data': 'is_available'},
        { 'data': 'height'},
        { 'data': 'width'},
        { 'data': 'depth'},
      ]
    });
    $('#table_tablets').DataTable({
      data: mock.tabs,
      columns: [
        { 'data': 'model_number'},
        { 'data': 'brand_name'},
        { 'data': 'price'},
        { 'data': 'weight'},
        { 'data': 'is_availble'},
        { 'data': 'processor_type'},
        { 'data': 'ram_size'},
        { 'data': 'number_cpu_cores'},
        { 'data': 'harddrive_size'},
        { 'data': 'display_size'},
        { 'data': 'battery_info'},
        { 'data': 'os'},
        { 'data': 'height'},
        { 'data': 'width'},
        { 'data': 'depth'},
        { 'data': 'camera_info'},
      ]
    });
});
