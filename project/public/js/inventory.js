_commonProps = ["model_number", "brand_name", "price", "weight", "type", "is_available", "serial_numbers"];
_requestJSON = {"deleteSerials":[]};

// Delete serial number in the request JSON
function deleteSerial(checkbox){
  alreadyIn = _requestJSON.deleteSerials.includes(checkbox.id);
  if (checkbox.checked && !alreadyIn){
    _requestJSON.deleteSerials.push(checkbox.id);
  }else if (!checkbox.checked && alreadyIn){
    var index = _requestJSON.deleteSerials.indexOf(checkbox.id);
    if (index > -1) {
      _requestJSON.deleteSerials.splice(index, 1);
    }
  }
}

// Function used to populate the child rows
function formatChildRows( data ) {
  tableString = "";
  serialString = "";
  for (property in data) {
    if (data.hasOwnProperty(property) && !_commonProps.includes(property)) {
       tableString += `
          <tr>
            <td>
              ${property}
            </td><td>
              ${data[property]}
            </td>
          </tr>`
    }
  }
  var serial_numbers = data.serial_numbers;
  for (number in serial_numbers) {
     serialString += `
        <tr>
          <td>
            ${serial_numbers[number]}
          </td>
          <td>
            <input type="checkbox" id=${serial_numbers[number]}@${data["model_number"]} onchange='deleteSerial(this);'>
          </td>
        </tr>`
  }
  return `<div class="container">
    <div class="row">
      <div class="col">
        <table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
          ${tableString}
        </table>
      </div>
      <div class="col">
        <table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
          <tr>
            <td> Serial Numbers </td>
            <td> Delete? </td>
          </tr>
            ${serialString}
        </table>
      </div>
    </div>
  </div>`;
}


$(document).ready(function() {
    let inventory_table = $('#table_inventory').DataTable({
      data: data,
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
});

function submitData(){
  $.ajax({
      url: '/inventoryAction',
      type: 'post',
      dataType: 'json',
      data: {"actions":JSON.stringify(_requestJSON)}
  });
}
