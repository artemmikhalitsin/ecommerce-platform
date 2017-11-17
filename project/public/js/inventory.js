_commonProps = ["model_number", "brand_name", "price", "weight",
                "type", "serial_numbers"];
_requestJSON = {"deleteSerials":[], "addSerials":[]};

// This is to check if there is symbols in what the client entered
function validateValue(value){
  let isAlphaNumeric = new RegExp(/^[a-zA-Z0-9]+/);
  return isAlphaNumeric.test(value);
}

function getAllTextBoxes(){
  let invalidModelIds = [];
  $('.add-item').each((i, obj) => {
    //gets the modelnumber of each serial number to be added
    let modelId = $(obj).parent().parent().parent().parent().attr('id');
    let value = $(obj).val();
    if (validateValue(value)){
      let item = value+"@"+ modelId;
      if (!_requestJSON.addSerials.includes(item)){
        _requestJSON.addSerials.push(item);
      }
    } else {
      invalidModelIds.push(modelId);
    }
  });
  if (invalidModelIds.length === 0){
    return true;
  } else{
    window.alert(`Serial Number at ${invalidModelIds.join(', ')} must be alphanumeric`);
    return false;
  }
}

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

function cancelAdd(row){
  $(row).parent().parent().remove();
}

function addSerialRow(button){
  $(button).parent().parent().parent().find('tr:last').prev().after(`
    <tr>
      <td>
        <input type="text" class="form-control add-item" name=@${data["model_number"]} placeholder="Serial Number">
      </td>
      <td>
        <button type="button" onclick="cancelAdd(this);" class="btn btn-default">Cancel</button>
      </td>
    </tr>
  `);
}

// Function used to populate the child rows
function formatChildRows( data ) {
  tableString = "";
  serialRows = "";
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
  if (serial_numbers < 1){
    serialRows += `<tr>
         <td colspan=2>
           No serial numbers.
         </td>
       </tr>`
  }
  //for each existing serial number add a new row
  for (number in serial_numbers) {
     serialRows += `
      <tr>
        <td>
          ${serial_numbers[number]}
        </td>
        <td>
          <input type="checkbox" id=${serial_numbers[number]}@${data["model_number"]} onchange='deleteSerial(this);'>
        </td>
      </tr>`;
  }
  //button to add more serial numbers
  serialRows += `
    <tr>
      <td colspan=2>
        <button type="button" onclick="addSerialRow(this);" class="btn btn-success">Add New Item</button>
      </td>
    </tr>
  `
  return `<div class="container">
    <div class="row">
      <div class="col">
        <table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
          ${tableString}
        </table>
      </div>
      <div class="col">
        <table cellpadding="5" cellspacing="0" border="0" id=${data["model_number"]} style="padding-left:50px;">
          <tr>
            <td> Serial Numbers </td>
            <td> Delete? </td>
          </tr>
            ${serialRows}
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
    $('input[type="search"]').val(search).keyup();
});

function submitData(){
    if(getAllTextBoxes()){
    $.ajax({
        url: '/inventoryAction',
        type: 'post',
        dataType: 'json',
        success: function (xhr) {
          window.location.reload()
        },
        error: function (xhr) {
          _requestJSON.addSerials = [];
          $('#error-box').show();
          $('#error-message').html(xhr.responseJSON.error);
        },
        data: {"actions":JSON.stringify(_requestJSON)}
    });
  }
}
