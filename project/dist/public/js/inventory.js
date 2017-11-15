"use strict";

_commonProps = ["model_number", "brand_name", "price", "weight", "type", "is_available", "serial_numbers"];
_requestJSON = { "deleteSerials": [], "addSerials": [] };

// This is to check if there is symbols in what the client entered
function validateValue(value) {
  var isAlphaNumeric = new RegExp(/^[a-zA-Z0-9]+/);
  return isAlphaNumeric.test(value);
}

function getAllTextBoxes() {
  var invalidModelIds = [];
  $('.add-item').each(function (i, obj) {
    //gets the modelnumber of each serial number to be added
    var modelId = $(obj).parent().parent().parent().parent().attr('id');
    var value = $(obj).val();
    if (validateValue(value)) {
      var item = value + "@" + modelId;
      if (!_requestJSON.addSerials.includes(item)) {
        _requestJSON.addSerials.push(item);
      }
    } else {
      invalidModelIds.push(modelId);
    }
  });
  if (invalidModelIds.length === 0) {
    return true;
  } else {
    window.alert("Serial Number at " + invalidModelIds.join(', ') + " must be alphanumeric");
    return false;
  }
}

// Delete serial number in the request JSON
function deleteSerial(checkbox) {
  alreadyIn = _requestJSON.deleteSerials.includes(checkbox.id);
  if (checkbox.checked && !alreadyIn) {
    _requestJSON.deleteSerials.push(checkbox.id);
  } else if (!checkbox.checked && alreadyIn) {
    var index = _requestJSON.deleteSerials.indexOf(checkbox.id);
    if (index > -1) {
      _requestJSON.deleteSerials.splice(index, 1);
    }
  }
}

function cancelAdd(row) {
  $(row).parent().parent().remove();
}

function addSerialRow(button) {
  $(button).parent().parent().parent().find('tr:last').prev().after("\n    <tr>\n      <td>\n        <input type=\"text\" class=\"form-control add-item\" name=@" + data["model_number"] + " placeholder=\"Serial Number\">\n      </td>\n      <td>\n        <button type=\"button\" onclick=\"cancelAdd(this);\" class=\"btn btn-default\">Cancel</button>\n      </td>\n    </tr>\n  ");
}

// Function used to populate the child rows
function formatChildRows(data) {
  tableString = "";
  serialRows = "";
  for (property in data) {
    if (data.hasOwnProperty(property) && !_commonProps.includes(property)) {
      tableString += "\n          <tr>\n            <td>\n              " + property + "\n            </td><td>\n              " + data[property] + "\n            </td>\n          </tr>";
    }
  }
  var serial_numbers = data.serial_numbers;
  if (serial_numbers < 1) {
    serialRows += "<tr>\n         <td colspan=2>\n           No serial numbers.\n         </td>\n       </tr>";
  }
  //for each existing serial number add a new row
  for (number in serial_numbers) {
    serialRows += "\n      <tr>\n        <td>\n          " + serial_numbers[number] + "\n        </td>\n        <td>\n          <input type=\"checkbox\" id=" + serial_numbers[number] + "@" + data["model_number"] + " onchange='deleteSerial(this);'>\n        </td>\n      </tr>";
  }
  //button to add more serial numbers
  serialRows += "\n    <tr>\n      <td colspan=2>\n        <button type=\"button\" onclick=\"addSerialRow(this);\" class=\"btn btn-success\">Add New Item</button>\n      </td>\n    </tr>\n  ";
  return "<div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col\">\n        <table cellpadding=\"5\" cellspacing=\"0\" border=\"0\" style=\"padding-left:50px;\">\n          " + tableString + "\n        </table>\n      </div>\n      <div class=\"col\">\n        <table cellpadding=\"5\" cellspacing=\"0\" border=\"0\" id=" + data["model_number"] + " style=\"padding-left:50px;\">\n          <tr>\n            <td> Serial Numbers </td>\n            <td> Delete? </td>\n          </tr>\n            " + serialRows + "\n        </table>\n      </div>\n    </div>\n  </div>";
}

$(document).ready(function () {
  var inventory_table = $('#table_inventory').DataTable({
    data: data,
    columns: [{
      'className': 'details-control',
      'orderable': false,
      'data': null,
      'defaultContent': ''
    }, { 'data': 'model_number' }, { 'data': 'brand_name' }, { 'data': 'price' }, { 'data': 'weight' }, { 'data': 'type' }, { 'data': 'is_available' }]
  });
  $('#table_inventory tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = inventory_table.row(tr);
    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    } else {
      // Open this row
      var rowData = row.data();
      console.log("Printing type: ", rowData.type);
      row.child(formatChildRows(row.data())).show();
      tr.addClass('shown');
    }
  });
});

function submitData() {
  if (getAllTextBoxes()) {
    $.ajax({
      url: '/inventoryAction',
      type: 'post',
      dataType: 'json',
      success: function success(xhr) {
        window.location.reload();
      },
      error: function error(xhr) {
        _requestJSON.addSerials = [];
        $('#error-box').show();
        $('#error-message').html(xhr.responseJSON.error);
      },
      data: { "actions": JSON.stringify(_requestJSON) }
    });
  }
}