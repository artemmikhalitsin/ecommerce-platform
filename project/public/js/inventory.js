const INVENTORY_ITEM = 'InventoryItem';
const COMPUTER = 'Computer';
const TABLET = 'Tablet';
const DESKTOP = 'Desktop';
const MONITOR = 'Monitor';
const TV = 'TV';

let mockComputerData = [{"id":1,"computer_id":1,"inventory_id":1,"display_size":80,"battery_info":"76-723-9622","os":"Y-Solowarm","camera":true,"touch_screen":false},
{"id":2,"computer_id":2,"inventory_id":2,"display_size":41,"battery_info":"92-627-0519","os":"Flexidy","camera":false,"touch_screen":false},
{"id":3,"computer_id":3,"inventory_id":3,"display_size":76,"battery_info":"74-441-4660","os":"Otcom","camera":true,"touch_screen":false},
{"id":4,"computer_id":4,"inventory_id":4,"display_size":60,"battery_info":"83-946-5471","os":"Lotlux","camera":false,"touch_screen":true},
{"id":5,"computer_id":5,"inventory_id":5,"display_size":30,"battery_info":"29-684-3504","os":"Tin","camera":true,"touch_screen":false},
{"id":6,"computer_id":6,"inventory_id":6,"display_size":6,"battery_info":"33-714-7601","os":"Ventosanzap","camera":true,"touch_screen":false},
{"id":7,"computer_id":7,"inventory_id":7,"display_size":80,"battery_info":"49-068-3796","os":"Keylex","camera":false,"touch_screen":true},
{"id":8,"computer_id":8,"inventory_id":8,"display_size":48,"battery_info":"69-508-0469","os":"Quo Lux","camera":true,"touch_screen":true},
{"id":9,"computer_id":9,"inventory_id":9,"display_size":23,"battery_info":"18-312-1892","os":"Viva","camera":true,"touch_screen":false},
{"id":10,"computer_id":10,"inventory_id":10,"display_size":74,"battery_info":"25-425-9085","os":"Cardguard","camera":true,"touch_screen":true}]

let getAllInventoryItems = () => {
  $.ajax({
      url: 'http://localhost:8080/getAllInventoryItems',
      type: 'GET',
      success: function(data){
          alert("success!");
          console.log(data);
          //populateInventory(data);
      },
      error: function(error){
          console.log(error);
      }
  })
}

/*
let populateInventory = (inventory) => {
    let id = "laptopTable";
    let table = $('#laptopTable');
    $.each(inventory, (index, object){
      object.
    })


}
*/
