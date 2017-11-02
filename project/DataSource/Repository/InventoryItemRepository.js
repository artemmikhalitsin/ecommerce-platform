const rootPath = require('app-root-dir').get();

let UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');
let InventoryItemsIdentityMap = require(rootPath + '/DataSource/IdentityMap/InventoryItemsIdentityMap.js');
let InventoryItemsTDG = require(rootPath + '/DataSource/TableDataGateway/InventoryItemsTDG.js');
class InventoryItemRepository{
  constructor(){
    this.uow = new UnitOfWork();
    this.inventoryItemsIM = new InventoryItemsIdentityMap();
    this.inventoryTDG = new InventoryItemsTDG();
  }
  getAll(){
    let context = this.inventoryItemsIM.getAll();
    if (context.length <= 0){
      context = this.inventoryTDG.select();

      Promise.all([context]).then((values)=>{
        context = values[0];
      });
      this.inventoryItemsIM.add(context);
    }
    return context;
  }
  get(args) {
    return database('inventoryItem').select('*');
  }
  getByIds(ids){
    let items = this.inventoryItemsIM.get(ids);
    if(items.length <= 0 || items.length < ids.length){
      var itemsFromTDG = this.inventoryTDG.select();
            Promise.all([itemsFromTDG]).then((values)=>{
              items = values[0];
            });
            this.inventoryItemsIM.add(items);
    }
    console.log("-------------");
    console.log(JSON.stringify(items));
    console.log("-------------");
    return items;
  }
  getAllInventoryItems() {
    return this.uow.getAllInventoryItems();
  }
  save(items){
    var electronicsToAdd = [];
    var electronicsToDelete = [];
 
    let model_numbers = items.map(p => p.model_number);
    console.log("model nums are: " + JSON.stringify(model_numbers));
    if(model_numbers.length > 0){
      let allInventoryItems = this.inventoryItemsIM.getByModelNumbers(model_numbers);
      console.log("all electronic items are: " + JSON.stringify(allInventoryItems));
      for(var i = 0; i < items.length; i++){
        for(var j = 0; j < items[i].serial_number.length; j++){
          if(allInventoryItems.findIndex(p => p.serial_number == items[i].serial_number[j]) === -1
            && electronicsToAdd.findIndex(e => e.serial_number == items[i].serial_number[j] && e.model_number == items[i].model_number) === -1){
              electronicsToAdd.push({'serial_number': items[i].serial_number[j], 'model_number': items[i].model_number});
            }
        }
      }
      electronicsToDelete = allInventoryItems.filter(function(item){
        console.log(item.model_number);
       items.forEach(function(element){
         console.log("serial numbers: " + JSON.stringify(element.serial_number));
         return element.serial_number.findIndex(e => e == item.serial_number) === -1;
        })
      });
  }
  console.log("Items to add" + JSON.stringify(electronicsToAdd));
    this.uow.registerNewItem(electronicsToAdd);
    this.uow.registerDeletedItem(electronicsToDelete);

    this.uow.commitAll();
    console.log("Affter commiting");
    this.inventoryItemsIM.add(electronicsToAdd);
  }
}
module.exports = InventoryItemRepository;
