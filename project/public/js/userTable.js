$(document).ready(function() {
    $.get("/api/getAllClients", (res) => {console.log(res)});
    let inventory_table = $('#table_users').DataTable({
      ajax: {
        url: '/api/getAllClients',
        dataSrc: ''
      },
      columns: [
          {'data': 'id'},
          {'data': 'email'},
          {'data': 'first_name'},
          {'data': 'last_name'},
          //{'data': 'password'},
          {'data': 'full_address'},
          {'data': 'phone_number'},
        /*  {
            'data': 'is_admin',
            render: function(data, type, row) {
              return data ? 'yes' : 'no';
            }
          }*/
      ]
    })
});
