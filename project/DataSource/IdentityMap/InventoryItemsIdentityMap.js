class InventoryItemsIdentityMap {
    constructor() {
        this.rootPath = require('app-root-dir').get();
        let UnitOfWork = require(this.rootPath + '/DataSource/UnitOfWork.js');
        let uow = new UnitOfWork();
        this.InventoryItems = uow.loadInventoryItems();
    }
    get(model_numbers) {
        return this.InventoryItems.filter(function(desc) {
            return model_numbers.findIndex(
              (x) => x == desc.model_number
            ) > -1;
        });
    }
    add(newInventoryItems) {
        this.InventoryItems.push(newInventoryItems);
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
