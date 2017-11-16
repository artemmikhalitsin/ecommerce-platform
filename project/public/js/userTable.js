$(document).ready(function() {
    let inventory_table = $('#table_inventory').DataTable({
    ajax: '/api/getAllClients'
      columns: [
        {
            'className': 'details-control',
            'orderable': false,
            'data': null,
            'defaultContent': '',
        },
        {'data': 'id'},
        {'data': 'email'},
        {'data': 'first_name'},
        {'data': 'last_name'},
        {'data': 'password'},
        {'data': 'full_adress'},
        {'data': 'phone_number'}
      ],
    })
});
