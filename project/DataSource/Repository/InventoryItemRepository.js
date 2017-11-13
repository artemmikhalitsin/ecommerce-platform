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
    var electronicsToUpdate = [];
    var electronicsToDelete = [];
 
    let itemIds = products.map(p => p.model_number);
    
    if(itemIds.length > 0){
    let context = this.getByIds(itemIds);
    console.log("Context in repo is: " + JSON.stringify(context));
    for(var i = 0; i < products.length; i++){
      if(context.findIndex(p => p.model_number == products[i].model_number) !== -1
          && electronicsToUpdate.findIndex(e => e.model_number == products[i].model_number) === -1){
            electronicsToUpdate.push(products[i]);
      }
      else if(context.findIndex(p => p.model_number == products[i].model_number) === -1
              && electronicsToAdd.findIndex(e => e.model_number == products[i].model_number) === -1){
                electronicsToAdd.push(products[i]);
              }
    }
    electronicsToDelete = context.filter(function(desc){
      console.log(desc.model_number);
      return electronicsToUpdate.findIndex(e => e.model_number == desc.model_number) === -1;
    });
  }
    this.uow.registerNew(electronicsToAdd);
    this.uow.registerDirty(electronicsToUpdate);
    this.uow.registerDeleted(electronicsToDelete);

    this.uow.commitAll(electronicsToAdd);
    console.log("Affter commiting");
    this.ProductDescriptionIM.add(electronicsToAdd);
  }
}
module.exports = InventoryItemRepository;
