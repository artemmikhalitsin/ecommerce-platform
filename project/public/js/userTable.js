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
          {'data': 'firstName'},
          {'data': 'lastName'},
          //{'data': 'password'},
          {'data': 'fullAddress'},
          {'data': 'phoneNumber'},
        /*  {
            'data': 'isAdmin',
            render: function(data, type, row) {
              return data ? 'yes' : 'no';
            }
          }*/
      ]
    })
});
