_commonProps = ["modelNumber", "brand_name", "price", "weight",
                "type", "serial_numbers", "computerId"];
_requestJSON = {"deleteSerials":[], "addSerials":[]};

/**
 * Validating the serial number entered by the admin
 * @author Ajmer Singh Gadreh
 * @param serialNumber entered by the admin
 * @return {Boolean}
 */
function validateSerialNumber(serialNumber){
  let isAlphaNumeric = new RegExp(/\w/);
  if (isAlphaNumeric.test(serialNumber) && serialNumber.length >= 10 && serialNumber.length <= 16) {
    return true;
  }
  return false;
}

/**
 * Collecting all the serial numbers to be added to the database
 * @author Ajmer Singh Gadreh
 * @return {Boolean}
 */
function getAllTextBoxes(){
  let invalidModelIds = []; // storing the model number associated with the serial number that contains errors
  let takenCareOf = false; // flag used to add multiple serial number associated with one model number

  // Iterating over all the input fields of serial numbers to be added
  $('.add-item').each((i, obj) => {
    let toAdd = new Object();
    let modelId = $(obj).parent().parent().parent().parent().attr('id');
    let serialNumber = $(obj).val();

    if (validateSerialNumber(serialNumber)){
      for (let index in _requestJSON.addSerials) {
        if (_requestJSON.addSerials.hasOwnProperty(index) && _requestJSON.addSerials[index].modelNumber === modelId) {
          // adding the serial number to an existing model number in the array
          _requestJSON.addSerials[index].serialNumbers.push(serialNumber);
          takenCareOf = true;
        }
      }

      // The following if executes only if the model number does not already exist in the addSerials array
      if (!takenCareOf) {
        toAdd.modelNumber = modelId;
        toAdd.serialNumbers = [];
        toAdd.serialNumbers.push(serialNumber);
        _requestJSON.addSerials.push(toAdd);
      }
      takenCareOf = false;
    } else {
      invalidModelIds.push(modelId);
    }
  });
  console.log(_requestJSON.addSerials);
  if (invalidModelIds.length === 0){
    return true;
  } else{
    window.alert(`Serial Number at ${invalidModelIds.join(', ')} must be alphanumeric and between 10 and 16 characters`);
    return false;
  }
}

/**
 * Collecting all the serial number to be deleted from the database
 * @author Ajmer Singh Gadreh
 * @param checkbox the checkbox next to the serial number to be deleted
 */
function deleteSerial(checkbox){
  let takenCareOf = false;
  let toBeDeleted = new Object();

  for (let index in _requestJSON.deleteSerials) {
    // Going to check if the model number has been already added to the deleteSerials array
    if (_requestJSON.deleteSerials.hasOwnProperty(index) && _requestJSON.deleteSerials[index].modelNumber === checkbox.name) {
      // if the checkbox is unckecked then we want to delete the serial number from the deleteSerials array otherwise add it
      if (!checkbox.checked) {
        if (_requestJSON.deleteSerials[index].serialNumbers.length == 1) {
          // deleting the serial number and model number from the deleteSerials array
          _requestJSON.deleteSerials.splice(index, 1);
          takenCareOf = true;
        } else {
          // deleting only the serial number from the deleteSerials array
          let position = _requestJSON.deleteSerials[index].serialNumbers.indexOf(checkbox.id);
          _requestJSON.deleteSerials[index].serialNumbers.splice(position, 1);
          takenCareOf = true;
        }
      } else {
        // adding the serial number to an existing model number in the array
        _requestJSON.deleteSerials[index].serialNumbers.push(checkbox.id);
        takenCareOf = true;
      }
    }
  }

  // The following if executes only if the model number does not already exist in the deleteSerials array
  if (!takenCareOf) {
    toBeDeleted.modelNumber = checkbox.name;
    toBeDeleted.serialNumbers = [];
    toBeDeleted.serialNumbers.push(checkbox.id);
    _requestJSON.deleteSerials.push(toBeDeleted);
  }
  console.log("to be deleted: " + JSON.stringify(_requestJSON.deleteSerials));
}

function cancelAdd(row){
  $(row).parent().parent().remove();
}

function addSerialRow(button){
  $(button).parent().parent().parent().find('tr:last').prev().after(`
    <tr>
      <td>
        <input type="text" class="form-control add-item" name=@${data["modelNumber"]} placeholder="Serial Number">
      </td>
      <td>
        <button type="button" onclick="cancelAdd(this);" class="btn btn-default">Cancel</button>
      </td>
    </tr>
  `);
}

/**
 * This function is used to populate the child rows
 * It is triggered when the green plus sign is clicked
 * @param data child rows data to be displayed
 * @return html string containing child row data
 */
function formatChildRows( data ) {
  tableString = "";
  serialRows = "";

  // for loop is used to display all the child rows data
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

  // following if statement executes when there are no serial numbers
  if (serial_numbers < 1){
    serialRows += `<tr>
         <td colspan=2>
           No serial numbers.
         </td>
       </tr>`
  }

  //for each existing serial number add a new row with a checkbox beside it
  for (number in serial_numbers) {
     serialRows += `
      <tr>
        <td>
          ${serialNumbers[number]}
        </td>
        <td>
          <input type="checkbox" id=${serial_numbers[number]} name=${data["modelNumber"]} onchange='deleteSerial(this);'>
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
        <table cellpadding="5" cellspacing="0" border="0" id=${data["modelNumber"]} style="padding-left:50px;">
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

/**
 * Populating the datatable with the data returned from the database
 * @author Ajmer Singh Gadreh
 */
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
        {'data': 'modelNumber'},
        {'data': 'brandName'},
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
      console.log("Going to call inventory actions");
      console.log(_requestJSON);
      /*
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
    */
  }
}
