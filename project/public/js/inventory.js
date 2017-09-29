const INVENTORY_ITEM = 'InventoryItem';
const COMPUTER = 'Computer';
const TABLET = 'Tablet';
const DESKTOP = 'Desktop';
const MONITOR = 'Monitor';
const TV = 'TV';

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

let populateInventory = (inventory) => {
  console.log("populating...");

}
