class InventoryItemsIdentityMap{
    constructor(){
        this.rootPath = require('app-root-dir').get();
        let UnitOfWork = require(this.rootPath + '/DataSource/UnitOfWork.js');
        let ProductDescriptionsTDG = require(this.rootPath + '/DataSource/TableDataGateway/PruductDescriptionsTDG.js');
        this.productDescTDG = new ProductDescriptionsTDG();
        let uow = new UnitOfWork();
        this.context = this.productDescTDG.select();
        Promise.all([this.context])
        .then((values) => {
          this.InventoryItems = values[0];
          
        console.log("InventoryIM constructor" + this.InventoryItems);
        })
    }
    get(model_numbers){
        return this.InventoryItems.filter(function(desc){
            return model_numbers.findIndex(x => x == desc.model_number) > -1;
        });
    }
    add(newInventoryItems){ 
        this.InventoryItems.push(newInventoryItems);
    }
    delete(inventoryItemsToRemove){
        this.InventoryItems.filter(function(desc){
            return inventoryItemsToRemove.findIndex(x => x == desc.model_number) === -1;
        });
    }
}
module.exports = InventoryItemsIdentityMap;