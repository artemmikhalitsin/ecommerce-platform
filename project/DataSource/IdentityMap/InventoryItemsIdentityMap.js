class InventoryItemsIdentityMap {
    constructor() {
        this.rootPath = require('app-root-dir').get();
        let UnitOfWork = require(this.rootPath + '/DataSource/UnitOfWork.js');
        let InventoryItemsTDG = require(this.rootPath + '/DataSource/TableDataGateway/InventoryItemsTDG.js');
        this.inventoryTDG = new InventoryItemsTDG();
        let context = this.inventoryTDG.select();
        this.InventoryItems = [];
        Promise.all([context])
        .then((values) => {
            this.InventoryItems = values[0];
        });
    }
    getAll(){
        console.log("From GetAll " + this.InventoryItems);
        let result = this.InventoryItems;
        if(this.InventoryItems.length > 0){
            return result;
        }
        else{
            var itemsFromTDG = this.inventoryTDG.select();
            Promise.all([itemsFromTDG])
            .then((values) => {
              result = values[0];
            })
            return result;
        }
    }
    get(model_numbers) {
        return this.InventoryItems.filter(function(desc) {
            return model_numbers.findIndex(
              (x) => x == desc.model_number
            ) > -1;
        });
    }
    getByModelNumbers(model_numbers){
        var allItems = this.getAll();
        if(allItems != null){
        var results = allItems.filter(function(item){
            return model_numbers.findIndex(x => x == item.model_number) > -1;
        });
        return results;
        }
        else return [];
    }
    add(newInventoryItems) {
        for(var i = 0; i < newInventoryItems.length; i++){
            if(this.InventoryItems.findIndex(p => p.serial_number == newInventoryItems[i].serial_number) === -1)
                this.InventoryItems.push(newInventoryItems[i]);
        }
    }
    delete(inventoryItemsToRemove) {
        this.InventoryItems.filter(function(desc) {
            return inventoryItemsToRemove.findIndex(
              (x) => x == desc.model_number
            ) === -1;
        });
    }
}
module.exports = InventoryItemsIdentityMap;
